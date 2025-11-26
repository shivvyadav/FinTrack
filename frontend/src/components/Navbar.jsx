import React, { useState } from "react";
import { X, Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <>
      {/* Fixed Navbar */}
      <div className="bg-foreground border-border fixed top-0 left-0 z-40 flex w-full gap-5 border-b px-4 py-4 backdrop-blur-[2px] transition-colors duration-300 sm:px-5 md:px-6">
        <button
          className="text-primary block xl:hidden"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <X className="h-6 w-6 md:size-7" />
          ) : (
            <Menu className="h-6 w-6 md:size-7" />
          )}
        </button>

        <h2 className="text-primary bg-secondary text-xl font-semibold">
          FinTrack
        </h2>
      </div>

      {/* Mobile Sidebar */}
      {openSideMenu && (
        <div className="bg-background border-border fixed top-[61px] left-0 z-40 h-[calc(100vh-61px)] w-64 overflow-y-auto border-r p-4 xl:hidden">
          <Sidebar activeMenu={activeMenu} />
        </div>
      )}
    </>
  );
};

export default Navbar;
