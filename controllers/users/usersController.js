const Account = require("../../model/Account/Account");
const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const appError = require("../../utils/appError");
const generateToken = require("../../utils/generateToken");

const registerUserController = async (req, res, next) => {
  const { fullname, email, password } = req.body;
  try {
    //check user already registered
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appError("User already registered", 400));
    }

    //check if fields are empty

    if (!fullname || !email || !password) {
      return next(appError("All fields are required", 502));
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //save to db
    const userAdded = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    res.json({
      status: "Success",
      message: "User created successfully ❤",
      data: userAdded, // can send the data as per needded
    });
  } catch (error) {
    return next(appError(error.message, error.statusCode));
  }
};

const loginUserController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //check if user is registered or not
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(appError("Invalid Login Credentials", 401));
    }

    //mathch the password
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return next(appError("Invalid Login Credentials", 401));
    }

    res.json({
      status: "Success",
      message: "User logged in successfully",
      data: userFound,
      token: generateToken(userFound._id),
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

const userProfileController = async (req, res, next) => {
  //find user by id from req.user._id
  const user = await User.findById(req.user).populate({
    path: "accounts",
    populate: { path: "transactions" },
  });

  try {
    res.json({
      status: "Success",
      user: user,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

const deleteUserController = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user);
    res.status(200).json({
      status: "Success",
      data: null,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

const updateUserController = async (req, res, next) => {
  const { fullname, email } = req.body;
  try {
    // const emailFound = await User.findOne({ email });
    // console.log(userFound.email === email);
    // console.log(emailFound);
    if (email) {
      const emailFound = await User.findOne({ email });
      if (emailFound) {
        return next(appError("Email is already in use or already taken", 400));
      }
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = await User.findByIdAndUpdate(
        req.user,
        {
          password: hashedPassword,
        },
        { new: true, runValidators: true }
      );
      return res.status(200).json({
        status: "success",
        data: user,
      });
    }
    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};
module.exports = {
  registerUserController,
  loginUserController,
  userProfileController,
  deleteUserController,
  updateUserController,
};
