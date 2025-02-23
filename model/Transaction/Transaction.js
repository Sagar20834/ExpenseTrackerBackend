const mongoose = require("mongoose");

//TransactionSchema

const transactionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["Income", "Expenses"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    account: {
      type: String,
      required: true,
      ref: "Account",
    },

    category: {
      type: String,
      enum: [
        "Food",
        "Transportation",
        "Utilities",
        "Entertainment",
        "Shopping",
        "Healthcare",
        "Dining Out",
        "Debt",
        "Miscellaneous",
        "Travel",
        "Business",
        "Vacation",
        "Emergency",
        "Education",
        "Family",
        "Others",
      ],
      required: true,
    },
    color: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },

    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
