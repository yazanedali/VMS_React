import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/signup');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f172a] text-white">
      <div className="bg-[#1e293b] p-8 rounded-lg shadow-md w-full max-w-md">
        <form className="login-form">
          <h2 className="text-center text-2xl font-bold text-[#e2e8f0] mb-6">Login</h2>
          
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm text-[#cbd5e1] mb-2">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              required
              className="w-full p-3 border border-[#334155] rounded bg-white text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm text-[#cbd5e1] mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              className="w-full p-3 border border-[#334155] rounded bg-white text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>

          <p className="text-center text-sm text-[#94a3b8] mt-4">
            Don't have an account?{' '}
            <a
              href="/signup"
              onClick={handleSignUpClick}
              className="text-blue-400 hover:underline"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
