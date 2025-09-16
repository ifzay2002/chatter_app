import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { axiosInstance } from '../../../components/utlities/axiosInstance';


export const sendMessageThunk = createAsyncThunk('message/send',
  async ({ receiverId, message }, { rejectWithValue }) => {
    // console.log(receiverId, message)
    try {
      const reponse = await axiosInstance.post(`/message/send/${receiverId}`,
        {
          message
        })

      return reponse.data;
    }

    catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput)  //ye error ko catch krke slice me bhej dega

    }
  })


export const getMessageThunk = createAsyncThunk('message/get',
  async ({ receiverId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/message/get-messages/${receiverId}`);
      // console.log(response)
      // console.log("Messages:", response.data);
      return response.data;
    }

    catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage;//ye backend se aayega
      toast.error(errorOutput);
      return rejectWithValue(errorOutput); //ye error ko catch krke slice me bhej dega

    } 
  })


