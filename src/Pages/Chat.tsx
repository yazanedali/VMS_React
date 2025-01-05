import React, { useEffect, useState } from "react";

interface User {
  id: string;
  username:string;
  fullName: string
  role: string
}

const Chat: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const role = localStorage.getItem('role')


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const query = `
        query{
          getUsers{
            id
            username
            role
            fullName
          }
        }
        `;

        const response = await fetch("http://localhost:5000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        const result = await response.json();
        if (result.data) {
          const allUsers: User[] = result.data.getUsers;
          const filteredUsers =
          role === "admin"
              ? allUsers 
              : allUsers.filter((user) => user.role === "admin");
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
      }
    };

    fetchUsers();
  }, [role]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Chat</h2>
      <input
        type="text"
        placeholder="Search for a user..."
        className="w-full bg-white text-gray-600 rounded-md py-2 px-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="bg-slate-800 rounded-lg p-5">
        <h2 className="text-2xl font-bold text-white mb-4">Available Users</h2>

 
          <div className="flex flex-row space-x-9">
            {users.map((user) => (
              <div key={user.id} className="flex flex-col items-center">
                <div className="bg-gray-500 rounded-full w-16 h-16 mb-2 hover:cursor-pointer"></div>
                <span className="text-white">{user.fullName}</span>
                <span className="text-gray-400 text-sm">{user.role}</span>
              </div>
            ))}
          </div>
        
      </div>
      <div className="mt-10 mb-10 bg-slate-800 rounded-lg p-5 flex items-start flex-col">
        <h2 className="text-2xl font-bold text-white mb-4">Chatting</h2>
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
