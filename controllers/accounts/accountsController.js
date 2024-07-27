const Account = require("../../model/Account/Account");
const User = require("../../model/User/User");
const appError = require("../../utils/appError");

const createAccountController = async (req, res, next) => {
  const { name, accountType, initialBalance, notes } = req.body;

  if (!name || !accountType || !initialBalance || !notes) {
    return next(appError("All fields are required", 400));
  }
  try {
    const userFound = await User.findById(req.user);
    if (!userFound) {
      return next(appError("User not found", 404));
    }
    const account = await Account.create({
      name,
      accountType,
      initialBalance,
      notes,
      // transactions,
      createdBy: req.user,
    });

    userFound.accounts.push(account._id);

    await userFound.save();

    res.json({
      status: "Success",
      data: account,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

const accountsDetailController = async (req, res, next) => {
  try {
    const accounts = await Account.find().populate("transactions");
    res.json({
      status: "Success",
      data: accounts,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

const accountDetailController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const account = await Account.findById(id).populate("transactions");

    res.json({
      status: "Success",
      data: account,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

const deleteAccountController = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Account.findByIdAndDelete(id);
    res.status(200).json({
      status: "Success",
      data: "Account Deleted ",
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

const updateAccountController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const account = await Account.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      status: "Success",
      data: account,
    });
  } catch (error) {
    return next(appError(error.message, 500));
  }
};

module.exports = {
  createAccountController,
  accountDetailController,
  accountsDetailController,
  deleteAccountController,
  updateAccountController,
};
