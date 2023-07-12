import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email_address: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    account_type: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    is_verified_email: {
      type: Boolean,
      required: false,
      default: false,
    },
    is_verified_phone: {
      type: Boolean,
      required: false,
      default: false,
    },
    is_active: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(this.password, salt);
      this.password = hashed;
    }
    next();
  } catch (e) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};


const User = mongoose.model("User", userSchema);

export default User;
