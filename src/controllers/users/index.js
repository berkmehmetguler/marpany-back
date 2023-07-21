import User from "../../models/users/index.js";
import Token from "../../models/token/token.js";
import { userValidation } from "./validation.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../middleware/jwt.js";
import { sendMailVerification } from "../../utils/mail_sender/sendEmail.js";
import { verificationTemplate } from "../../utils/mail_sender/templates/verification/verification.js";
import { forgotPasswordTemplate } from "../../utils/mail_sender/templates/forgot_password/forgot_password.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const isExistUser = await User.findOne({ username });

    if (!isExistUser) {
      throw new Error("Invalid username");
    }

    const isMatched = await isExistUser.isValidPassword(password);

    if (!isMatched) {
       throw new Error("Invalid password");
    }

    const accessToken = await signAccessToken({
      user_id: isExistUser._id,
    });
    const refreshToken = await signRefreshToken(isExistUser._id);

    const userData = isExistUser.toObject();
    delete userData.password;
    delete userData.__v;
    res.status(200).json({ user: userData, accessToken, refreshToken });
  } catch (e) {
    return next(e);
  }
};

const createUser = async (req, res) => {
  const { phone, email_address, username } = req.body;

  const { error } = userValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const isExistUser = await User.findOne({
    $or: [{ phone }, { email_address }, { username }],
  });
  if (isExistUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  try {
    const newUser = await User.create(req.body);
    const accessToken = await signAccessToken(newUser._id);
    const refreshToken = await signRefreshToken(newUser._id);

    const token = await new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
      token_type: "verification",
    }).save();

    const url = `${process.env.BASE_URL}/auth/verify_email?token=${token.token}&virtualize=${token._id}`;

    const mailData = {
      email: newUser.email_address,
      subject: "Verify Email",
      body: verificationTemplate(newUser.first_name, url),
    };

    sendMailVerification(mailData);

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const { id, token } = req.params;
  try {
    const isExistToken = await Token.findOne({
      _id: id,
      token,
      token_type: "verification",
    });
    console.log("isExistToken", isExistToken);
    if (!isExistToken) {
      console.log("Invalid token");
      return res.status(404).json({ error: "Invalid token" });
    }

    const updatedUser = await User.findOne({ _id: isExistToken.userId });
    if (!updatedUser) {
      return res.status(404).json({ error: "Invalid token" });
    }

    updatedUser.is_verified_email = true;
    await updatedUser.save();

    await isExistToken.delete();

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const forgotPassword = async (req, res, next) => {
  const { user_info } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email_address: user_info }, { username: user_info }],
    });

    if (!user) {
      return res.status(200).json({ message: "Success" });
    }
    const tokenIsExist = await Token.findOne({
      userId: user._id,
      token_type: "forgot_password",
    });
    if (tokenIsExist) {
      await Token.deleteOne({ userId: user._id });
    }

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
      token_type: "forgot_password",
    }).save();

    const url = `${process.env.BASE_URL}/auth/reset_password?virtualize=${user._id}&token=${token.token}`;
    const mailData = {
      email: user.email_address,
      subject: "Reset Password",
      body: forgotPasswordTemplate(user.first_name, url),
    };

    sendMailVerification(mailData);
    res.status(200).json({ message: "Success" });
  } catch (e) {
    next(e);
  }
};

const resetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const isOldPassword = await bcrypt.compare(password, user.password);
    if (isOldPassword) {
      return res
        .status(400)
        .json({ message: "new password must be different from old password" });
    }

    const tokenData = await Token.findOne({
      userId: user._id,
      token,
      token_type: "forgot_password",
    });
    if (!tokenData) {
      return res.status(400).json({ message: "invalid link" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await User.updateOne({ _id: id }, { $set: { password: hashPassword } });
    await Token.deleteOne({
      userId: user._id,
      token,
      token_type: "forgot_password",
    });

    res.json({
      message: "password has been reset",
    });
  } catch (e) {
    next(e);
  }
};

const checkToken = async (req, res, next) => {
  const { id, token } = req.params;
  const { token_type } = req.body;

  try {
    const isExist = await Token.findOne({
      token,
      userId: id,
      token_type,
    });

    if (!isExist) {
      return res.status(400).json({ message: "Invalid token" });
    }

    res.status(201).json({ message: "Success" });
  } catch (e) {
    next(e);
  }
};

const refreshToken = async (req, res, next) => {
  const { refresh_token } = req.body;
  console.log("refresh_token", refresh_token);
  try {
    if (!refresh_token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user_id = await verifyRefreshToken(refresh_token);
    const accessToken = await signAccessToken(user_id);
    const refreshToken = await signRefreshToken(user_id);

    return res.status(200).json({ accessToken, refreshToken });
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export {
  createUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkToken,
  loginUser,
  refreshToken,
};
