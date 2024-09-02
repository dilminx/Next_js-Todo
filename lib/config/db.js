import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect("mongodb+srv://todo_nextjs:JbUW4Me7qngmtjsQ@todo.lfa0g.mongodb.net/")
    console.log("Db connected");
}


//JbUW4Me7qngmtjsQ  todo_nextjs