const express = require("express");
require("dotenv").config();
const usersRoute = require("./routes/users/usersRoute");
const accountsRoute = require("./routes/accounts/accountsRoute");
const transactionsRoute = require("./routes/transactions/transactionsRoute");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
require("./config/dbConnect");

//middlewares
//routes
//users route
// POST/api/v1/users/

//--/api/v1/users--form usersRoute and / form here
app.use(`/api/v1/users`, usersRoute);
app.use("/api/v1/accounts", accountsRoute);
app.use("/api/v1/transactions", transactionsRoute);

//accout creatio routes

//transactions route

//error handlers middlewares
app.use(globalErrorHandler);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
