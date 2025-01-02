import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [obj, setobj] = useState<prop>({
    fullname: "",
    username: "",
    password: ""
  })

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  interface prop {
    fullname: string;
    username: string;
    password: string
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setobj((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const mutation = `
      mutation {
      signup(fullName:"${obj.fullname}", username:"${obj.username}", password:"${obj.password}") {
        id
        fullName
        username
        role
        }
      }
    `;

    try {
      const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: mutation }),
      });

      const result = await response.json();
      if (result.errors) {
        setErrorMessage("The username is already taken. Please try a different one.");
      } else {
        setErrorMessage(null);
        console.log(`Success: ${JSON.stringify(result.data.signup)}`);
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    
    <div className="flex items-center justify-center min-h-screen bg-[#0F172A]">
      <div className="bg-[#1E293B] p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-[#E2E8F0] mb-6">Sign Up</h2>
        <form onSubmit={submitForm}>
          <label htmlFor="full-name" className="block mb-2 text-sm text-white">Full Name</label>
          <input
            type="text"
            id="full-name"
            name = "fullname"
            value={obj.fullname}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="w-full p-2 mb-4 border border-[#3D4D70] rounded bg-white text-black text-sm placeholder-gray-400"
          />

          <label htmlFor="username" className="block mb-2 text-sm text-white">Username</label>
          <input
            type="text"
            id="username"
            name = "username"
            value={obj.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
            className="w-full p-2 mb-4 border border-[#3D4D70] rounded bg-white text-black text-sm placeholder-gray-400"
          />

          <label htmlFor="password" className="block mb-2 text-sm text-white">Password</label>
          <input
            type="password"
            id="password"
            name = "password"
            value={obj.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full p-2 mb-4 border border-[#3D4D70] rounded bg-white text-black text-sm placeholder-gray-400"
          />

          <button
            type="submit"
            className="w-full py-2 bg-[#3B82F6] hover:bg-[#2563EB] rounded text-white font-medium transition duration-300"
          >
            Sign Up
          </button>
        </form>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-4 text-center">
            {errorMessage}
          </p>
        )}

        <p className="text-center text-sm text-[#94A3B8] mt-4">
          Already have an account? <a  className="text-[#3B82F6] hover:underline hover:cursor-pointer" onClick={()=> navigate("/")}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
