import React from 'react';

const Signup: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0F172A]">
      <div className="bg-[#1E293B] p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-[#E2E8F0] mb-6">Sign Up</h2>
        <form>
          <label htmlFor="full-name" className="block mb-2 text-sm text-white">Full Name</label>
          <input
            type="text"
            id="full-name"
            placeholder="Enter your full name"
            required
            className="w-full p-2 mb-4 border border-[#3D4D70] rounded bg-white text-black text-sm placeholder-gray-400"
          />

          <label htmlFor="username" className="block mb-2 text-sm text-white">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            required
            className="w-full p-2 mb-4 border border-[#3D4D70] rounded bg-white text-black text-sm placeholder-gray-400"
          />

          <label htmlFor="password" className="block mb-2 text-sm text-white">Password</label>
          <input
            type="password"
            id="password"
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

        <p className="text-center text-sm text-[#94A3B8] mt-4">
          Already have an account? <a href="login.html" className="text-[#3B82F6] hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
