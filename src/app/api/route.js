import { NextResponse } from "next/server";
import { ConnectDB } from "../../../lib/config/db";
import TodoModel from "../../../lib/config/models/TodoModels";

const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();
export async function GET() {
    const todos = await TodoModel.find({})
  return NextResponse.json({todos: todos});
}
export async function POST(request) {
  const { title, description } = await request.json();
  await TodoModel.create({ title, description });
  return NextResponse.json({ msg: "create todo" });
}
export async function DELETE(request) {
  const mongoId = await request.nextUrl.searchParams.get('mongoId')
  await TodoModel.findByIdAndDelete(mongoId)
  return NextResponse.json({ msg: "Delete todo" });
}
export async function PUT(request) {
  await ConnectDB();  // Ensure MongoDB connection
  const mongoId = request.nextUrl.searchParams.get('mongoId');
  if (!mongoId) {
      return NextResponse.json({ msg: "MongoID not provided" }, { status: 400 });
  }
  await TodoModel.findByIdAndUpdate(mongoId, {
      $set: {
          isCompleted: true,
      }
  });
  return NextResponse.json({ msg: "Todo completed" });
}
