import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {

  const navigate = useNavigate();


  return (
   
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
  );
};

export default SignUp;
