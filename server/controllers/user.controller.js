import User from '../models/user.model.js';
import { asyncHandler } from '../utilites/asyncHandler.utility.js';
import {errorHandler} from '../utilites/errorHandler.utility.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendToken } from '../utilites/sendToken.utility.js';
import { sendExpireToken } from '../utilites/sendToken.utility.js';




export const register = asyncHandler(async (req, res, next) => {

  const { FullName, username, password, gender } = req.body;

  if (!FullName || !username || !password || !gender) {
    return next(new errorHandler("All fields are required", 400));
  }

  const user = await User.findOne({ username });
  if (user) {
    return next(new errorHandler("User already exists", 400));
  }

  const hashPassword = await bcrypt.hash(password, 10)

  const avatarType = gender === 'male' ? 'boy' : 'girl';


  const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${username}`;



  const newUser = await User.create({
    FullName,
    username,
    password: hashPassword,
    gender,
    avatar
  })

  const tokenData = {
    _id: newUser?._id
  }
  //token generation ---{data, secret(env file), expireIn)}
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });


  // sendToken(res,token) // sirf cookie set karega

  // res.status(200)
  // .json({
  //   success: true,
  //   responseData:{
  //     newUser,
  //     token
  //   }
  // })

  // });
res
  .status(200)
  .cookie("token", token, {
    expires: new Date(
      Date.now() + process.env.COOKIES_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  })
  .json({
    success: true,
    responseData: {
      user, // register me
      token,
    },
  });

})

export const login = asyncHandler(async (req, res, next) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return next(new errorHandler("Please enter a valid username and password", 400));
  }

  const user = await User.findOne({ username });
  if (!user) {
    return next(new errorHandler("Please enter a valid username and password", 400));
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return next(new errorHandler("Please enter a valid username and password", 400));
  }
  //token generation ---{data, secret(env file), expireIn)}

  const tokenData = {
    _id: user?._id
  }

  const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
  // sendToken(res, token) // sirf cookie set karega
 res
  .status(200)
  .cookie("token", token, {
    expires: new Date(
      Date.now() + process.env.COOKIES_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  })
  .json({
    success: true,
    responseData: {
      user, // register me
      token,
    },
  });

});

export const getProfile = asyncHandler(async (req, res, next) => {
  // console.log(req.user);
  const userId = req.user._id;
  //  console.log(userId)


  const profile = await User.findById(userId)

  res.status(200).json({
    success: true,
    responseData: profile,
  })
});

export const logout = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logout successfull!",
    });
});


///mere illawa baqi jo bh ho ga wo other user m hi ai ga meri id bs mere ho gy tu m pane se compare krwa kr login likh skti ho 
export const getOtherUser = asyncHandler(async (req, res, next) => {
  const otherUsers = await User.find({ _id: { $ne: req.user._id } })

  res.status(200).json({
    success: true,
    responseData: otherUsers,
  })

})





























// Middlewares
// export const func1 = (req, res, next) => {
// console.log('Hello! I am a func1');

// next();
// }
// export const func2 = (req, res, next) => {
// console.log('Hello! I am a func2');
// next();
// }



