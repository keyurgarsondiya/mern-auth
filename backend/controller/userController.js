import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Auth user/set token
//route POST /api/users/auth
// @access Public

export const authUser = asyncHandler(async (req, res) => {
  console.log('Res Body: ', req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc Logout
//route POST /api/users/logout
// @access Public

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(201).json({ message: 'User logged out' });
});

// @desc Register
//route POST /api/users/
// @access Public

export const registerUser = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Get user profile
//route GET /api/users/profile
// @access Private

export const getUserProfile = asyncHandler(async (req, res) => {
  res.status(201).json({ message: 'User Profile' });
});

// @desc Update User profile
//route PUT /api/users/profile
// @access Private

export const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(201).json({ message: 'Update User Profile' });
});