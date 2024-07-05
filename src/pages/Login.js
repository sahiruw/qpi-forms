import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WIneBackground from "../components/WIneBackground";
import { useAuth } from "../context/authContext";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    
    const form = {
      email,
      password
    };
    
    console.log(form);
    let user = await auth.loginAction(form);
    console.log(user);
    if (user.role) {
      navigate(`/${String(user.role).charAt(0)}`);
    }
  };

  return (
    <div className="relative h-[calc(100dvh)] w-full items-center flex text-white/80 text-sm xl:text-lg">
      <WIneBackground />

      <div className="relative flex  items-center justify-center h-min w-full md:w-4/6">
        <div className="flex w-5/6 h-4/6 md:h-5/6  bg-white/30 backdrop-blur-sm  rounded-3xl p-6  ">
          <div className="place-self-center mb-10 w-full">
            <h2 className=" text-4xl md:text-6xl font-bold my-10 text-center">
              Login
            </h2>
            <form className="max-w-sm mx-auto justify-center" onSubmit={handleLogin}>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2  font-medium "
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 "
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
              >
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
