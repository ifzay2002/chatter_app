import { createSlice } from '@reduxjs/toolkit';
import io from 'socket.io-client';

const initialState = {
  socket: null,
  OnlineUsers: null,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
//     initializeSocket: (state, action) => {
//      const socket = io(import.meta.env.VITE_DB_ORIGIN, {
//   query: {
//     userId: action.payload,
//   },
// });
//       // console.log(socket)
//       state.socket = socket;
//     },
initializeSocket: (state, action) => {
  if (state.socket?.connected) return;
  state.socket = io(import.meta.env.VITE_DB_ORIGIN, {
    query: { userId: action.payload },
    transports: ['websocket', 'polling'],
  });
},


    setOnlineUsers: (state, action) => {
      state.OnlineUsers = action.payload;
    }

  },

})

export const { initializeSocket, setOnlineUsers } = socketSlice.actions;

export default socketSlice.reducer


