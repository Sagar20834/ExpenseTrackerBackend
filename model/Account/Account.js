const mongoose = require("mongoose");

//accountSchema

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: [
        "Savings",
        "Investment",
        "Checking",
        "Building",
        "School",
        "Credit Card",
        "Loans",
        "Charity",
        "Business",
        "Travel",
        "Personal",
        "Automobile",
        "Retirement",
        "Entertainment",
        "Utilities",
        "Gifts",
        "Vacation",
        "Retirement Savings",
        "Savings Bonds",
        "Mortgage",
        "Auto Loans",
        "Cash",
        "Food",
        "Others",
      ],
      defaultValue: ["Savings"],
      required: true,
    },
    initialBalance: {
      type: Number,
      defaultValue: 0,
    },

    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
