const jwt = require("jsonwebtoken");
const User = require("../models/user");
const rateLimit = require('express-rate-limit')

// Authentication check middleware
exports.authCheck = (req, res, next) => {
  const authHeader = req.headers.authorization

  // If auth header is present
  if (authHeader) {
    try {
      // Get the JWT thats sent in headers of the request
      const token = req.headers.authorization.split(' ')[1]

      // If token exists
      if (token) {
        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
          // If the token provided is not valid
          if (err) {
            return res.status(401).json({
              error: true,
              type: [
                {
                  code: 'GLOBAL_ERROR',
                  message: 'Token is not valid or expired, please log in again',
                },
              ],
            })
          }
          req.user = user
          next()
        })
      }
    } catch (error) {
      console.log('AUTH_CHECK_ERROR', error)
    }
  } else {
    // Auth header isn't present so, send a 401 error
    res.status(401).json({
      error: true,
      type: [
        {
          code: 'GLOBAL_ERROR',
          message: 'You are not authorized to access this resource',
        },
      ],
    })
  }
}

// Admin check middleware
exports.adminCheck = async (req, res, next) => {
  const { _id } = req.user

  const user = await User.findOne({ _id }).exec()

  if (user.role !== 'admin') {
    res.status(403).json({
      error: 'Admin Resource, access denied!',
    })
  } else {
    next()
  }
}

// Super admin check middleware
exports.superAdminCheck = async (req, res, next) => {
  const { _id } = req.user

  const user = await User.findOne({ _id }).exec()

  if (user.role !== 'superadmin') {
    res.status(403).json({
      error: 'Super Admin Resource, access denied!',
    })
  } else {
    next()
  }
}

// Super admin or admin check middleware
exports.superOrAdminCheck = async (req, res, next) => {
  const { _id } = req.user

  const user = await User.findOne({ _id }).exec()

  if (user.role !== 'superadmin' && user.role !== 'admin') {
    res.status(403).json({
      error: 'Super Admin or Admin Resource, access denied!',
    })
  } else {
    next()
  }
}

exports.refreshLimiter = rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  max: 2, // max 2 requests per 30 seconds per IP
  message: {
    error: true,
    message: 'Too many refresh attempts. Please wait.',
  },
  headers: true,
})
