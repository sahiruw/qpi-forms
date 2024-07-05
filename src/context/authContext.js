import { useContext, createContext, useState, useEffect } from "react";
import { logout, login, getCurrentUser } from "../services/authService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("qpi-frm") || "");

  useEffect(() => {
    const loggedUser = getCurrentUser();
    setUser(loggedUser);
  }, []);

  const loginAction = async (data) => {
    let loggedUser = await login(data);
    setUser(loggedUser);
    return loggedUser;
  };

  const logOutAction = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOutAction }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
