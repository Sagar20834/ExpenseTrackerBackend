const express = require("express");

const {
  registerUserController,
  loginUserController,
  userProfileController,
  deleteUserController,
  updateUserController,
} = require("../../controllers/users/usersController");
const isLogin = require("../../middlewares/isLogin");

const usersRoute = express.Router();

usersRoute.post("/register", registerUserController);
usersRoute.post("/login", loginUserController);
usersRoute.get("/profile", isLogin, userProfileController);
usersRoute.delete("/", isLogin, deleteUserController);
usersRoute.put("/", isLogin, updateUserController);

module.exports = usersRoute;
