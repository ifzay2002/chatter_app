import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { axiosInstance } from '../../../components/utlities/axiosInstance';


export const loginUserThunk = createAsyncThunk('user/login', async ({ username, password }, //error thorw krne k leye reject with values ka use krna hota hai 
  { rejectWithValue }) => {
  try {
    const reponse = await axiosInstance.post('/user/login',  //data behjna hai
      {
        username,
        password,
      })
    toast.success("Login Successful")
    return reponse.data;  //ye data slice me jayega
  }


  catch (error) {
    console.error(error)
    const errorOutput = error?.response?.data?.errMessage //ye backend se aayega
    toast.error(errorOutput)
    return rejectWithValue(errorOutput)  //ye error ko catch krke slice me bhej dega

  }
})


export const registerUserThunk = createAsyncThunk('user/signup',
  async ({ fullName, username, password, gender },
    //error thorw krne k leye reject with values ka use krna hota hai 
    { rejectWithValue }) => {
    // console.error(fullName, username, password,gender)
    try {
      const reponse = await axiosInstance.post('/user/register',  //data behjna hai
        {
          FullName: fullName,
          username,
          password,
          gender,
        })
      toast.success("Account Created Successfully!!")
      return reponse.data;  //ye data slice me jayega
    }






    catch (error) {
      console.error(error)
      const errorOutput = error?.response?.data?.errMessage //ye backend se aayega
      toast.error(errorOutput)
      return rejectWithValue(errorOutput)  //ye error ko catch krke slice me bhej dega

    }
  })



export const logoutUserThunk = createAsyncThunk('user/logout',
  async (_, { rejectWithValue }) => {

    try {
      const reponse = await axiosInstance.post('/user/logout') //data behjna hai
      toast.success("Logout Successfully!!")
      return reponse.data;  //ye data slice me jayega
    }

    catch (error) {
      // console.error(error)  
      const errorOutput = error?.response?.data?.errMessage //ye backend se aayega
      toast.error(errorOutput)
      return rejectWithValue(errorOutput)  //ye error ko catch krke slice me bhej dega

    }
  })


export const getUserProfileThunk = createAsyncThunk('user/getProfile',
  async (_, { rejectWithValue }) => {

    try {
      const reponse = await axiosInstance.get('/user/get-profile')

      return reponse.data;  //ye data slice me jayega
    }






    catch (error) {
      console.error(error)
      const errorOutput = error?.response?.data?.errMessage //ye backend se aayega
      // toast.error(errorOutput)
      return rejectWithValue(errorOutput)  //ye error ko catch krke slice me bhej dega

    }
  })


export const getOtherUserThunk = createAsyncThunk('user/getOtherUser',
  async (_, { rejectWithValue }) => {

    try {
      const reponse = await axiosInstance.get('/user/get-other-users')

      return reponse.data;  //ye data slice me jayega
    }






    catch (error) {
      console.error(error)
      const errorOutput = error?.response?.data?.errMessage //ye backend se aayega
      // toast.error(errorOutput)
      return rejectWithValue(errorOutput)  //ye error ko catch krke slice me bhej dega

    }
  })



