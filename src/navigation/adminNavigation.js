import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Admin from "../pages/Admin";
import NavBar from "../components/NavBar";
import ToolRequestsTable from "../pages/Table01";
import MachineRequestsTable from "../pages/Table02";

function AdminInterface() {
  const navigate = useNavigate();
  return (
    <>
      <NavBar navigate={navigate} />
      <div className="relative  w-full items-center flex  z-0">
        <div className="relative flex items-center h-full w-full">
          <Routes>
            <Route path="/tools/" element={<ToolRequestsTable />} />
            <Route path="/repairs/" element={<MachineRequestsTable />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default AdminInterface;
