import { createSlice } from '@reduxjs/toolkit'
import { getMessageThunk, sendMessageThunk } from './message.thunk';



const initialState = {
  buttonLoading: false,
  screenLoading: false,
  messages: null,
};

export const messageSlilce = createSlice({
  name: "message",
  initialState,
  reducers: {
    setNewMessage: (state, action) => {

      // agrnew user howa tu bydefualt tu null hai na tu erro ae ga iss leye 
      const oldMessages = state.messages ?? [];
      state.messages = [...oldMessages, action.payload];
    },

    // resetMessages: (state) => {
    //   state.messages = [];
    // }
  },
  extraReducers: (builder) => {
    //send message 
    builder.addCase(sendMessageThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });

    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      ///spread opertor ta k pichle wala msg hmien dikh r next bh // is leye use kiya 
      const oldMessages = state.messages ?? [];
      state.messages = [...oldMessages, action.payload?.responseData];
      state.buttonLoading = false;
    });

    builder.addCase(sendMessageThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });
    //get Messages 

    builder.addCase(getMessageThunk.pending, (state, action) => {
      state.buttonLoading = true;

    });

    builder.addCase(getMessageThunk.fulfilled, (state, action) => {

      state.messages = action.payload?.responseData?.messages;
      state.buttonLoading = false;
    });

    builder.addCase(getMessageThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });



  }
})

export const { setNewMessage } = messageSlilce.actions;

export default messageSlilce.reducer


