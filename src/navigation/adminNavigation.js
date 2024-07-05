import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Admin from "../pages/Admin";
import NavBar from "../components/NavBar";
import EmployeeForm from "../pages/Form01";
function AdminInterface() {
  const navigate = useNavigate();
  return (
    <>
      <NavBar navigate={navigate} />
      <div className="relative  w-full items-center flex  z-0">
        <div className="relative flex items-center h-full w-full">
          <Routes>
            <Route path="/" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default AdminInterface;
