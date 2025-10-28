import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ activeMenu, children }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="bg-background transition-colors duration-300">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <Sidebar activeMenu={activeMenu} />
          </div>

          <div className="mx-5 grow">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
