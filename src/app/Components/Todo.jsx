import React from "react";

const Todo = ({ id, title, description,completeTodo,deleteTodo, mongoId, complete }) => {
  return (
    <tr>
      <td className="px-4 py-2 border-b border-gray-200">{id + 1}</td>
      <td className="px-4 py-2 border-b border-gray-200">{title }</td>
      <td className="px-4 py-2 border-b border-gray-200">{description}</td>
      <td className={`px-4 py-2 text-left border-b border-gray-200 ${complete ? 'font-bold' : 'font-thin'}`}>{complete?"Completed":"Pending"}</td>
      <td className="flex gap-1 px-4 py-2 border-b border-gray-200">
      {!complete && (
          <button
            onClick={() => completeTodo(mongoId)}
            className="p-1 px-2 text-sm text-white bg-green-600 rounded-lg"
          >
            Done
          </button>
        )}
        <button onClick={()=>deleteTodo(mongoId)} className="p-1 text-sm text-white bg-red-600 rounded-lg">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Todo;
