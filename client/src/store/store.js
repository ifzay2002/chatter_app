// // store ka setup hai 


// import { configureStore } from '@reduxjs/toolkit'
// import userReducer from './slice/user/user.slice'
// import messageReducer from './slice/message/message.slice'
// import socketReducer from './slice/socket/socket.slice'


// export const store = configureStore({
//   reducer: {
//     userReducer,
//     messageReducer,
//     socketReducer,
//   },

//   // non serializable k erro k lye middleware
//   middleware:(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: {
//     ignoredPaths: ["socketReducer.socket"],
//   }}),
// })  


import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user/user.slice";
import messageReducer from "./slice/message/message.slice";
import socketReducer from "./slice/socket/socket.slice";

export const store = configureStore({
  reducer: {
    userReducer,
    messageReducer,
    socketReducer,
  },

 // non serializable k erro k lye middleware
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({
      serializableCheck: {
        ignoredPaths: ["socketReducer.socket"],
      },
    }),
});