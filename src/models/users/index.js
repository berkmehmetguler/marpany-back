import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
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
  user_type: {
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
  created_at: {
    type: Date,
    required: false,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;

