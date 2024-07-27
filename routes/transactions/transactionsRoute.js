const express = require("express");
const {
  createTransactionContoller,
  getAllTransactionContoller,
  getSingleTransactionContoller,
  deleteTransactionController,
  updateTransactionController,
} = require("../../controllers/transactions/transactionsController");
const isLogin = require("../../middlewares/isLogin");
const transactionsRoute = express.Router();

transactionsRoute.post("/", isLogin, createTransactionContoller);
transactionsRoute.get("/", getAllTransactionContoller);
transactionsRoute.get("/:id", getSingleTransactionContoller);
transactionsRoute.delete("/:id", deleteTransactionController);
transactionsRoute.put("/:id", updateTransactionController);

module.exports = transactionsRoute;
