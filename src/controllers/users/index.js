import User from "../../models/users/index.js";
import Token from "../../models/token/token.js";
import { userValidation } from "./validation.js";
import { signAccessToken, signRefreshToken } from "../../middleware/jwt.js";
import { sendMailVerification } from "../../utils/mail_sender/sendEmail.js";
import { verificationTemplate } from "../../utils/mail_sender/templates/verification/verification.js";
import crypto from "crypto";
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
  console.log('id', id);
    console.log('token', token);
  try {
    const isExistToken = await Token.findOne({
      _id: id,
      token,
      token_type: "verification",
    });
    console.log('isExistToken', isExistToken);
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

export { createUser, verifyEmail}