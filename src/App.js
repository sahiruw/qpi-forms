// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import UserInterface from "./navigation/userNavigation";
import AdminInterface from "./navigation/adminNavigation";
import ProtectedRoute from "./navigation/protectedRoutes";
import { getCurrentUser, login, logout } from "./services/authService";
import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";
import './styles/commonStyles.css'

const App = () => {
  return (
    <div className="w-full">
      {/* <NavBar /> */}
      <Router>
        <Routes>
          <Route
            path=""
            element={
              <ProtectedRoute
                component={Home}
                allowedRoles={["all"]}
                tag={"home"}
              />
            }
          />
          

          <Route
            path="/login"
            element={
              <ProtectedRoute
                component={Login}
                allowedRoles={["all"]}
                tag={"login"}
              />
            }
          />

          <Route
            path="/a/*"
            element={
              <ProtectedRoute
                component={AdminInterface}
                allowedRoles={["admin"]}
                tag={"admin"}
              />
            }
          />

          <Route
            path="/u/*"
            element={
              <ProtectedRoute
                component={UserInterface}
                allowedRoles={["user"]}
                tag={"user"}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
