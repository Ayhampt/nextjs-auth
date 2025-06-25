import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on('connected',()=>{
        console.log('mongoDb connected sucessfuly');
        
    })
  } catch (error) {
    console.log("somthing went wrong");
    console.log(error);
  }
};

export {connectDb}