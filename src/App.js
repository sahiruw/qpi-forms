// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import UserInterface from "./navigation/userNavigation";
import AdminInterface from "./navigation/adminNavigation";
import ProtectedRoute from "./navigation/protectedRoutes";
import NotFound from "./pages/NotFound";
import './styles/commonStyles.css'

const App = () => {
  return (
    <div className="w-full bg-gradient-to-tr from-slate-800 via-sky-600 to-blue-900 h-dvh">
      <Router>
        <Routes>

          <Route
            path="/"
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
