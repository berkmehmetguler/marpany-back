import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0.00,
  },
  last_payment: {
    date: {
      type: Date,
      required: false,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: false,
      default: 0.0,
    },
  },
  last_widthdraw: {
    date: {
      type: Date,
      required: false,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: false,
      default: 0.0,
    },
  },
  last_deposit: {
    date: {
      type: Date,
      required: false,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: false,
      default: 0.0,
    },
  },
  payment_history: [
    {
      date: {
        type: Date,
        required: false,
        default: Date.now,
      },
      amount: {
        type: Number,
        required: false,
        default: 0.00,
      },
      service: {
        type: String,
        required: false,
        default: "Unknown",
      },
    },
  ],
  currency: {
    type: String,
    required: false,
    default: "USD",
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

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
