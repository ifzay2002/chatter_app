import { asyncHandler } from '../utilites/asyncHandler.utility.js';
import { errorHandler } from '../utilites/errorHandler.utility.js';
import jwt from 'jsonwebtoken';



export const isAuthenticated = asyncHandler(async (req, res, next) => {

  const token = await req.cookies.token || req.headers['authorization']?.replace("Bearer ", "");
  // console.log(token);
  if (!token) {
    return next(new errorHandler("No token provided", 401));
  }
  //decoded token
  const tokenData = jwt.verify(token, process.env.JWT_SECRET)
  req.user = tokenData;
  next();

  // console.log(tokenData);
})

