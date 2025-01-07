import React, { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  fullName: string;
  role: string;
}

interface Message {
  id: string;
  sender: string;
  receiver: string;
  message: string;
}

const Chat: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const role = localStorage.getItem("role");
  const currentUsername = localStorage.getItem("username");

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const query = `
        query {
          getUsers {
            id
            username
            role
            fullName
          }
        }`;

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
      }
    };

    fetchUsers();
  }, [role]);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser || !currentUsername) return;

      try {
        const query = `
        query {
          getMessages(senderUsername: "${currentUsername}", receiverUsername: "${selectedUser.username}") {
            id
            sender
            receiver
            message
          }
        }`;

        const response = await fetch("http://localhost:5000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        const result = await response.json();
        if (result.data) {
          const messagesData: Message[] = result.data.getMessages;
          setMessages(messagesData.sort((a, b) => a.id.localeCompare(b.id)));
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedUser, currentUsername, messages]);

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    try {
      const mutation = `
      mutation {
        sendMessage(senderUsername: "${currentUsername}", receiverUsername: "${selectedUser.username}", message: "${newMessage}")
      }`;

      const response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: mutation }),
      });

      const result = await response.json();
      if (result.data) {
        // Add the new message to the state
        setMessages([...messages, result.data.sendMessage]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen p-4">
      <h2 className="text-2xl font-bold text-white mb-6">Chat</h2>

      <div className="block  grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User List Section */}
        <div className="mb-5 bg-gray-700 rounded-lg p-4">
          <h2 className="text-xl font-bold text-white mb-4">Available Users</h2>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-600 text-gray-200 rounded-md py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="grid gap-2 grid-cols-1 md:grid-cols-5 ">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`flex items-center p-3 rounded-lg cursor-pointer transform transition-transform duration-300 ease-in-out ${
                  selectedUser?.id === user.id ? "bg-blue-500" : "bg-gray-600"
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="bg-gray-500 rounded-full w-12 h-12 mr-4"></div>
                <div>
                  <span className="text-white text-lg font-bold">
                    {user.fullName}
                  </span>
                  <div className="text-gray-400 text-sm">{user.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Section */}
        <div className="flex flex-col bg-gray-700 rounded-lg p-4">
          <h2 className="text-xl font-bold text-white mb-4">
            Chatting with {selectedUser?.fullName || "..."}
          </h2>

          <div className="flex-grow p-4 h-96 overflow-y-auto bg-gray-800 border-2 border-gray-600 rounded-md">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg mb-3 ${
                  msg.sender === currentUsername
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-600 text-gray-200"
                }`}
              >
                <strong>{msg.sender}: </strong>
                {msg.message}
              </div>
            ))}
          </div>

          {/* Message Input Section */}
          <div className="flex mt-4 space-x-4">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full bg-gray-600 text-gray-200 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
