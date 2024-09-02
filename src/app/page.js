"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navebar from "./Components/Navebar";
import Todo from "./Components/Todo";

export default function Home() {
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const [todoData, setTodoData] = useState([]);
  const fetchTodo = async () => {
    const response = await axios.get("/api");
    setTodoData(response.data.todos);
  };
  const deleteTodo = async (Id) => { 
    const response = await axios.delete('/api',{
      params: {
        mongoId: Id
      }
    })
    toast.success(response.data.msg)
    fetchTodo();
  }
  const completeTodo = async(id) => {
    const response = await axios.put('/api',null, {
      params: {
        mongoId: id
      }
    })
    toast.success(response.data.msg)
    fetchTodo();
   }
  useEffect(() => {
    fetchTodo();
  }, []);
  const onChangeForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((form) => ({ ...form, [name]: value }));
    console.log(data);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api", data);

      toast.success(response.data.msg);
      setData({
        title: "",
        description: "",
      });
      await fetchTodo();
    } catch (error) {
      toast.error("Error saving");
      console.error(error);
    }
  };
  return (
    <main>
      <Navebar />
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
      <div className="">
        <form
          onSubmit={submitForm}
          className="flex flex-col max-w-[600px] mt-24 mx-auto w-[80%] "
        >
          <input
            onChange={onChangeForm}
            value={data.title}
            type="text"
            name="title"
            className="w-full px-3 py-2 border-2 "
            placeholder="Create Todo"
          />
          <textarea
            onChange={onChangeForm}
            value={data.description}
            name="description"
            placeholder="Enter Description"
            className="w-full px-3 py-2 mt-2 border-2"
          ></textarea>
          <button type="submit" className="w-40 p-1 mt-1 bg-red-400 rounded-lg">
            Add ToDo
          </button>
        </form>

        <div className="overflow-x-auto mt-24 w-[80%] mx-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-200">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-200">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-200">
                  Description
                </th>
                <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-200">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {todoData.map((item, index) => {
                return (
                  <Todo
                    key={index}
                    id={index}
                    title={item.title}
                    description={item.description}
                    complete={item.isCompleted}
                    mongoId={item._id}
                    deleteTodo={deleteTodo}
                    completeTodo={completeTodo}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
