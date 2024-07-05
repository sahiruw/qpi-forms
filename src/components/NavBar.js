import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, Navigate, useLocation } from "react-router-dom";

const NavBar = ({ navigate }) => {
  const location = useLocation()
  const auth = useAuth();

  const handleNavItemClick = (path) => {
    navigate(path);
  };

  const handleLogout = async (event) => {
    let user = await auth.logOutAction();
    <Navigate to="/" />;

    window.location.reload();
  };

  if (auth.user?.email) {
    return (
      <nav className="absolute z-50 w-full flex justify-center">
        
        <div className="flex items-center justify-between w-full text-black text-sm md:text-base bg-white px-2 py-2 md:py-4  rounded-b-lg">
          <span className="self-center font-sans font-bold text-lg whitespace-nowrap hidden md:block">
            Quantum Precision
          </span>
      
          <div className="flex w-full md:w-auto">
            {adminNavBar(handleNavItemClick, handleLogout, auth, location.pathname)}
          </div>
        </div>
      </nav>
    );
  }

  return (<>{JSON.stringify(auth.user)}</>);
};

export default NavBar;

const li_style =
  "md:hover:text-navy_blue rounded md:p-2 focus:ring-blue-500 gap-0 cursor-pointer";

const adminNavBar = (handleNavItemClick, handleLogout, auth, path) => {
  return (
    <ul className="flex font-medium  p-0 space-x-8  flex-row place-content-between w-full rounded-lg place-items-center">
      
      <li
        className={li_style + (String(path).includes("tools") ? " text-navy_blue text-lg" : "")}
        onClick={() => {
          handleNavItemClick(`/${String(auth.user.role).charAt(0)}/tools`);
        }}
      >
        <a className="block py-2 px-3 rounded  md:p-0 md:">Tools</a>
      </li>

      <li
        className={li_style + (String(path).includes("repair") ? " text-navy_blue text-lg" : "")}
        onClick={() => {
          handleNavItemClick(`/${String(auth.user.role).charAt(0)}/repairs`);
        }}
      >
        <a className="block py-2 px-3 rounded  md:p-0 md:">Repairs</a>
      </li>

      <li
        className={li_style}
        onClick={() => {
          handleLogout();
        }}
      >
        <a className="block py-2 px-3 rounded  md:p-0 md:">Log Out</a>
      </li>
    </ul>
  );
};
