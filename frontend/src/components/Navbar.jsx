import React, { useState } from "react";
import { X, Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <>
      <div className="bg-foreground border-border sticky top-0 z-30 flex gap-5 border-b px-7 py-4 backdrop-blur-[2px] transition-colors duration-300">
        <button
          className="text-primary block lg:hidden"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        <h2 className="text-primary bg-secondary text-xl font-semibold">
          FinTrack
        </h2>
      </div>

      {/* Mobile Sidebar */}
      {openSideMenu && (
        <div className="bg-background fixed top-[61px] left-4">
          <Sidebar activeMenu={activeMenu} />
        </div>
      )}
    </>
  );
};

export default Navbar;
