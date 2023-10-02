import React, { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { AuthContext } from "../../states/context/AuthContext/AuthContext";
import { ThemeContext } from "../../states/context/ThemeContext/ThemeContext";
const Navbar = () => {
  const { visibility, updateVisibility } = useContext(ThemeContext);
  const { logoutAdmin } = useContext(AuthContext);
  const handleLogout = () => {
    logoutAdmin();
  };
  return (
    <>
      <nav className="h-20 w-auto mb-0 bg-colorDark flex justify-between p-4  items-center text-slate-100 text-xl">
        <div className="mx-8 font-poppins-bold text-2xl tracking-widest ">
          Biller
        </div>
        <div className="flex justify-between ">
          <div
            className="mx-8 cursor-pointer "
            onClick={() => updateVisibility()}
          >
            {!visibility ? <BsSun /> : <BsMoon />}
          </div>
          <div className="cursor-pointer" onClick={handleLogout}>
            {<AiOutlineLogout />}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
