const isLogin = require("../../middlewares/isLogin");
const express = require("express");
const {
  createAccountController,
  accountsDetailController,
  accountDetailController,
  deleteAccountController,
  updateAccountController,
} = require("../../controllers/accounts/accountsController");
const accountsRoute = express.Router();

accountsRoute.post("/", isLogin, createAccountController);
accountsRoute.get("/:id", accountDetailController);
accountsRoute.get("/", accountsDetailController);
accountsRoute.delete("/:id", deleteAccountController);
accountsRoute.put("/:id", updateAccountController);

module.exports = accountsRoute;
