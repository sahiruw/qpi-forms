import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Admin from "../pages/Admin/Admin";
import Events from "../pages/Admin/Events";
import Participants from "../pages/Admin/Participants";
import AddEvent from "../pages/Admin/AddEvent";
import WIneBackground from "../components/WIneBackground";
import Event from "../pages/Event";
import NavBar from "../components/NavBar";

function AdminInterface() {
  const navigate = useNavigate();
  return (
    <>
      <NavBar navigate={navigate} />
      <div className="relative  w-full items-center flex  z-0  min-h-screen">
        <div className="">
          <WIneBackground isBlurred={true} />
        </div>
        <div className="relative flex items-center h-full w-full">
          <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/events" element={<Events />} />
            <Route path="/participants" element={<Participants />} />
            <Route path="/event/new" element={<AddEvent />} />
            <Route path="/event" element={<Event />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default AdminInterface;
