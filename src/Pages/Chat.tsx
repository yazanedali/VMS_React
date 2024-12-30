import React from "react";

const Chat: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Chat with Admins</h2>
      <input
        type="text"
        placeholder="Search for an admin..."
        className="w-full bg-white text-gray-600 rounded-md py-2 px-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="bg-slate-800 rounded-lg p-5">
        <h2 className="text-2xl font-bold text-white mb-4">Available Admins</h2>

        <div className="flex flex-row space-x-9">
          {["Admin1", "Admin2", "Admin3"].map((admin, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-gray-500 rounded-full w-16 h-16 mb-2"></div>
              <span className="text-white">{admin}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 mb-10 bg-slate-800 rounded-lg p-5 flex items-start flex-col">
        <h2 className="text-2xl font-bold text-white mb-4">
          Chat with: Admins
        </h2>
        <div className="p-4 h-96 overflow-y-auto w-full border-2 rounded-md  border-gray-600 flex"></div>

        <input
          type="text"
          placeholder="Type your message..."
          className="mt-10 w-full bg-white text-gray-700 rounded-md py-6 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 h-32 mb-5 placeholder:text-gray-400 placeholder:relative placeholder:top-0"
        />

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
