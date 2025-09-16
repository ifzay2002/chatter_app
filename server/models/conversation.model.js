import mongoose from "mongoose";

const conversationScehma = new mongoose.Schema({
participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"}],
    messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Message"
    }]
},{timestamps:true})

export default mongoose.model("Conversation", conversationScehma);


// import mongoose from "mongoose";

// const conversationSchema = new mongoose.Schema(
//   {
//     participants: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//     messages: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Message",
//       },
//     ],
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Conversation", conversationSchema);