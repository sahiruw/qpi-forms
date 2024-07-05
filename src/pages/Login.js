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
    <div className="relative h-[calc(100dvh)] w-full items-center flex text-white/80 text-sm xl:text-lg">
      <div className="relative flex items-center justify-center h-min w-full md:w-4/6">
        <div className="flex w-5/6 h-4/6 md:h-5/6 bg-white/30 backdrop-blur-sm rounded-3xl p-6">
          <div className="place-self-center mb-10 w-full">
            <h2 className="text-4xl md:text-6xl font-bold my-10 text-center">
              Login
            </h2>
            <form
              className="max-w-sm mx-auto justify-center"
              onSubmit={handleLogin}
            >
              {error && <div className="mb-5 text-red-500">{error}</div>}
              
              <div className="mb-5 flex justify-center">
                <button
                  type="button"
                  className={`px-4 py-2 mr-2 rounded-lg ${role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                  onClick={() => setRole("user")}
                >
                  User
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 ml-2 rounded-lg ${role === "admin" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                  onClick={() => setRole("admin")}
                >
                  Admin
                </button>
              </div>

              <div className="mb-5">
                <label htmlFor="password" className="block mb-2">
                  6-digit Code
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength="6"
                  minLength="6"
                  pattern="\d{6}"
                  title="Please enter a 6-digit code"
                />
              </div>
              
              <button type="submit" className="btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
