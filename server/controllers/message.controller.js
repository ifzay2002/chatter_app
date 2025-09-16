import Message from '../models/message.model.js'
import Conversation from '../models/conversation.model.js'
import { asyncHandler } from '../utilites/asyncHandler.utility.js';
import { errorHandler } from '../utilites/errorHandler.utility.js';
import { getSocketId, io } from '../socket/socket.js'




export const sendMessage = asyncHandler(async (req, res, next) => {
   const senderId = req.user._id;
   const receiverId = req.params.receiverId;
   const { message } = req.body;


   if (!message || !senderId || !receiverId) {
      return next(new errorHandler('Please provide all required fields', 400));
   }


   ///agr find word use krtienn tu jitne bh user msg kr rahien hotie ajata [a,b], [a,b,c], [b,c] etc
   // lekin abhi srf findOne kiya hi atu 2 k beche hi ho gy [a,b], [b,c], [a,c] etc

   // 1) conversation find/create
   // let conversation = await Conversation.findOne({

   //    participants: {
   //       $all: [senderId, receiverId],
   //    },
   // })

   // if (!conversation) {
   //    conversation = await Conversation.create({
   //       participants: [senderId, receiverId],
   //    })
   // }
   let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
   });
   if (!conversation) {
      conversation = await Conversation.create({
         participants: [senderId, receiverId],
         messages: [],
      });
   }
   // new msg create     
   // 2) message save
   const newMsg = await Message.create({ senderId, receiverId, message });

   // if save to populate msgs
   if (newMsg) {
      // add new message to conversation
      // 3) conversation update
      conversation.messages.push(newMsg._id);
      await conversation.save();
   }


   //socket.io  short polling

   // 4) realtime emit

   const receiverSocketId = getSocketId(receiverId.toString());
   const senderSocketId = getSocketId(senderId.toString());

   // // specifci user
   // const socketId = getSocketId(receiverId)
   // io.to(socketId).emit("newMesaage", newMsg);

   if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMsg);
   }
   // Optional: sender ko bhi emit (taake apni screen bhi immmediately update ho)
   //  if (senderSocketId) {
   //    io.to(senderSocketId).emit('newMessage', newMsg);
   //  }

   return res.status(201).json({
      success: true,
      responseData: newMsg,
   })
}
   //   catch (err) {
   //     next(err);
   //   }
)

// export const getMessages = asyncHandler(async (req, res, next) => {
//    const myId = req.user._id;
//    const otherParticipantId = req.params.otherParticipantId;
//    // console.log(otherParticipantId)
//    // console.log(myId, otherParticipantId);

//    // query params se page aur limit le lo
//    //  const page = parseInt(req.query.page) || 1; // Default to page 1
//    //  const limit = parseInt(req.query.limit) || 20; // Default to 10 messages per page
//    //    const skip = (page - 1) * limit; // Calculate the number of messages to skip


//    if (!myId || !otherParticipantId) {
//       return next(new errorHandler('Please provide all required fields', 400));
//    }


//    let conversation = await Conversation.findOne({

//       participants: {
//          $all: [myId, otherParticipantId],
//       },
//    }).populate('messages');
//    // ({
//    //    path: 'messages',
//    //    options:{
//    //       sort: { createdAt: -1 }, // Sort by createdAt in descending order
//    //       skip: skip, // Skip messages for pagination
//    //       limit: limit, // Limit the number of messages returned
//    //       }  
//    // })

//    // if(!conversation) {
//    // return next(new ErrorHandler('Conversation not found', 404));
//    // }





//    res.status(200).json({
//       success: true,
//       responseData: conversation,
//       //      pagination: {
//       //    page,
//       //    limit,
//       //    hasMore: conversation.messages.length === limit,
//       //  },
//    });
// });






// // Middlewares
// // export const func1 = (req, res, next) => {
// // console.log('Hello! I am a func1');

// // next();
// // }
// // export const func2 = (req, res, next) => {
// // console.log('Hello! I am a func2');
// // next();
// // }



export const getMessages = async (req, res, next) => {
   try {
      const userId = req.user._id;
      const otherId = req.params.otherParticipantId;

      const convo = await Conversation.findOne({
         participants: { $all: [userId, otherId] },
      }).populate('messages');

      return res.status(200).json({
         success: true,
         responseData: { messages: convo?.messages ?? [] },
      });
   } catch (err) {
      next(err);
   }
};
