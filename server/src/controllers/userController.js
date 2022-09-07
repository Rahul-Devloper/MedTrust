const UserService = require("../services/userService");
const AdminService = require("../services/adminService");
const User = require("../models/user");

/**********************************
  Check if user is a logged in
***********************************/
exports.currentUser = async (req, res) => {
  const { _id } = req.user;

  const user = await UserService.findUserById(_id);
  const admin = await AdminService.findOneAdmin({ user: _id });

  const adminSub = {
    currentPlan: admin?.currentPlan,
    subscription: admin?.subscription,
    subscriptionStatus: admin?.subscriptionStatus,
    stripeCustomerId: admin?.stripeCustomerId,
  };

  const subData = user.role === "admin" ? { ...adminSub } : null;

  if (user) {
    res.status(200).json({
      user: User.toClientObject(user),
      message: "Oh yes!",
      subData,
    });
  } else {
    res.status(403).json({
      admin: false,
      error: "You are trying to access a restricted resource. Access Denied",
    });
  }
};

/**********************************
  Create an user
***********************************/
exports.createUser = async (req, res) => {
  const { name, email } = req.body;

  // If name or email is empty, throw 400 error
  if (!name || !email) {
    return res.status(400).json({
      error: "Please provide name and email",
    });
  }

  // If user already exists, throw 409 error
  const userExists = await UserService.findOneUser({ email });
  if (userExists) {
    return res.status(409).json({
      error: "User already exists",
    });
  }

  try {
    const newUser = await UserService.createUser(req.body);

    res.status(201).json(newUser);
  } catch (error) {
    console.log("CREATE_USER_ERROR", error);
  }
};

/**********************************
  Get a user By id
***********************************/
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("name email").exec();

    // If no user found, throw 404 error
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("GET_USER_BY_ID_ERROR", error);
  }
};

/**********************************
  Get all users
***********************************/
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserService.findAllUsers();

    // If no user found, throw 404 error
    if (users.length === 1) {
      // Only admin user is present
      return res.status(404).json({
        error: "No users found",
      });
    }
    res.status(200).json(users);
  } catch (error) {
    console.log("GET_ALL_USERS_ERROR", error);
  }
};

/**********************************
  Update a user by id
***********************************/
exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserService.findOneUserAndUpdate(id, req.body, {
      new: true,
    });

    // If no user found, throw 404 error
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("UPDATE_USER_BY_ID_ERROR", error);
  }
};
