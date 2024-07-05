import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = () => {
  const [role, setRole] = useState("user"); // default role
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = role === "admin" ? "admin@qpi-forms.co" : "user@qpi-forms.co";

    const form = {
      email,
      password,
    };

    try {
      let user = await auth.loginAction(form);
      if (user.role) {
        navigate(`/${String(user.role).charAt(0)}/tools`);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-dvh  text-white/80 text-sm xl:text-lg">
      <div className="flex w-5/6 max-w-lg p-8 bg-white/30 backdrop-blur-sm rounded-3xl shadow-lg">
        <div className="w-full">
        <h2 className="text-4xl md:text-3xl font-bold my-10 text-center text-black">
        Quantum Precision
          </h2>
          <h2 className="text-4xl md:text-6xl font-bold my-10 text-center">
            Login
          </h2>
          <form className="max-w-sm mx-auto" onSubmit={handleLogin}>
            {error && <div className="mb-5 text-red-500">{error}</div>}

            <div className="mb-5 flex justify-center">
              <button
                type="button"
                className={`px-4 py-2 mr-2 rounded-lg transition-all duration-300 ${role === "user" ? "bg-blue-500 text-white shadow-md" : "bg-gray-200 text-black hover:bg-gray-300"}`}
                onClick={() => setRole("user")}
              >
                User
              </button>
              <button
                type="button"
                className={`px-4 py-2 ml-2 rounded-lg transition-all duration-300 ${role === "admin" ? "bg-blue-500 text-white shadow-md" : "bg-gray-200 text-black hover:bg-gray-300"}`}
                onClick={() => setRole("admin")}
              >
                Admin
              </button>
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-gray-800">
                6-digit Code
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-all duration-300 focus:shadow-outline"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength="6"
                minLength="6"
                pattern="\d{6}"
                title="Please enter a 6-digit code"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
