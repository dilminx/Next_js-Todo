import mongoose from "mongoose";


export const ConnectDB = async () => {
    await mongoose.connect(process.env.Mongo_url)
    console.log("Db connected");
}


//JbUW4Me7qngmtjsQ  todo_nextjs