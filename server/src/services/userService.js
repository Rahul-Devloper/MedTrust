const User = require("../models/user");

class UserService {
  // Create a new user
  static createUser = async (user) => {
    try {
      const newUser = new User(user)
      await newUser.save()

      return newUser
    } catch (error) {
      throw error
    }
  }

  // Find one user
  static findOneUser = async (query) => {
    try {
      const user = await User.findOne(query).exec()

      return user
    } catch (error) {
      throw error
    }
  }

  // Find user by id
  static findUserById = async (id) => {
    try {
      const user = await User.findById(id).exec()

      return user
    } catch (error) {
      throw error
    }
  }

  // Find all users
  static findAllUsers = async () => {
    try {
      const users = await User.find().exec()

      return users
    } catch (error) {
      throw error
    }
  }

  // Find one user and update
  static findOneUserAndUpdate = async (query, update) => {
    try {
      const user = await User.findOneAndUpdate(query, update, {
        new: true,
      }).exec()

      return user
    } catch (error) {
      throw error
    }
  }

  // Delete a user by id
  static deleteUserById = async (id) => {
    try {
      const userToDelete = await User.findById(id).exec()

      // If no user found, throw 404 error
      if (!userToDelete) {
        return res.status(404).json({
          error: 'User not found',
        })
      }

      await userToDelete.remove()

      return userToDelete
    } catch (error) {
      throw error
    }
  }

  // Update user's last active time
  static updateUserLastActiveTime = async (id) => {
    try {
      const user = await User.findById(id).exec()

      // If no user found, throw 404 error
      if (!user) {
        return res.status(404).json({
          error: 'User not found',
        })
      }

      user.lastActive = new Date()
      await user.save()

      return user
    } catch (error) {
      throw error
    }
  }

  static updateUserOtp = async (userId, { otp, otpExpiry }) => {
    return await User.findByIdAndUpdate(userId, { otp, otpExpiry })
  }

  static clearUserOtp = async (userId) => {
    return await User.findByIdAndUpdate(userId, { otp: null, otpExpiry: null })
  }
}

module.exports = UserService;
