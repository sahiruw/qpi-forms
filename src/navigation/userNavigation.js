import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import User from "../pages/User";
import NavBar from "../components/NavBar";
import EmployeeForm from "../pages/Form01";
import EmployeeForm2 from "../pages/Form02";

function UserInterface() {
  const navigate = useNavigate();
  return (
    <>
      <NavBar navigate={navigate} />
      <div className="relative  w-full items-center flex  z-0  min-h-screen">
        <div className="relative flex items-center h-full w-full">
          <Routes>
            <Route path="/" element={<User />} />
            <Route path="/tools/" element={<EmployeeForm />} />
            <Route path="/repairs/" element={<EmployeeForm2 />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default UserInterface;
