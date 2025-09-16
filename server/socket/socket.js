import dotenv from "dotenv";
dotenv.config();   ///dotenv ho giya configure


import { Server } from 'socket.io';
import http from 'http'
import express from 'express';


const app = express();

const server = http.createServer(app);

// console.log(process.env.CLIENT_URL)
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST'],
  }
})

// r agr user mil jae tu map kr du 
const userSocketMapping = {
  // userId : socketId,
  // mtlb jitne bh user iss userSocketMApping m arahien hia ,  msg kr rahien hai wo sb onlien hai 
}


// connect howa k nhi socket
// io.on('connection', (socket) => {
//   // console.log(socket.id)
//   const userId = socket.handshake.query.userId;
//   //  agr user nhi milta hai tu return krdo
//   if (!userId) return;

//   userSocketMapping[userId] = socket.id;
//   // console.log(Object.keys(userSocketMapping))

//   io.emit("OnlineUsers", Object.keys(userSocketMapping))


//   socket.on('disconnect', () => {
//     // console.log(socket.id)
//     delete userSocketMapping[userId];
//     io.emit("OnlineUsers", Object.keys(userSocketMapping))
//   })

// })

io.on('connection', (socket) => {
  const userId = socket.handshake?.query?.userId;
  console.log('Socket connected:', socket.id, 'userId:', userId);

  if (!userId) return;

  userSocketMapping[userId] = socket.id;
  io.emit("OnlineUsers", Object.keys(userSocketMapping));

  socket.on('disconnect', () => {
    delete userSocketMapping[userId];
    io.emit("OnlineUsers", Object.keys(userSocketMapping));
  });
});

// socket id nikale gy user id hai hamare ps 
const getSocketId = (userId) => {
  return userSocketMapping[userId];
}

export { io, app, server, getSocketId };


