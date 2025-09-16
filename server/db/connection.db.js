import mongoose from "mongoose";


export const connectDb = async()=>{ 
    try {
    const MONGODB_URI = process.env.MONGODB_URI;
    const instance = await mongoose.connect(MONGODB_URI);
    console.log(`Mongodb connected: ${instance.connection.host}`)
}
catch (error) {
    console.log(error);
  } 
};
