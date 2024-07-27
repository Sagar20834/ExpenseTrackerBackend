const { request } = require("express");
const Account = require("../../model/Account/Account");
const Transaction = require("../../model/Transaction/Transaction");
const User = require("../../model/User/User");
const appError = require("../../utils/appError");

const createTransactionContoller = async (req, res, next) => {
  const { name, transactionType, amount, category, notes, account } = req.body; //--transaction details
  try {
    const userFound = await User.findById(req.user); //--user
    if (!userFound) {
      return next(appError("User not found"), 404);
    }
    //find the account
    const accountFound = await Account.findById(account);
    if (!accountFound) {
      return next(appError("Account not found"), 404);
    }

    const transaction = await Transaction.create({
      name,
      transactionType,
      amount,
      category,
      notes,
      account,
      createdBy: req.user,
    });

    accountFound.transactions.push(transaction._id);
    await accountFound.save();
    res.json({
      status: "Success",
      data: transaction,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

const getAllTransactionContoller = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    res.json({
      status: "Success",
      data: transactions,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

const getSingleTransactionContoller = async (req, res, next) => {
  try {
    const id = req.params.id;
    const transaction = await Transaction.findById(id);
    res.json({
      status: "Success",
      data: transaction,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

const deleteTransactionController = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Transaction.findByIdAndDelete(id);
    res.json({
      status: "Success",
      data: null,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

const updateTransactionController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json({
      status: "Success",
      data: updatedTransaction,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

module.exports = {
  createTransactionContoller,
  getAllTransactionContoller,
  getSingleTransactionContoller,
  deleteTransactionController,
  updateTransactionController,
};
