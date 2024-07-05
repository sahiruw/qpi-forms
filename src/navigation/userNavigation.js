import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import User from "../pages/User";

function UserInterface() {

  return (
    <Routes>
      <Route path="" element={<User />} />
    </Routes>
  );
}

export default UserInterface;
