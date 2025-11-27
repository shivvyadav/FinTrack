import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ activeMenu, children }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-background h-screen overflow-hidden transition-colors duration-300">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex overflow-hidden">
          <div className="h-[calc(100vh-61px)] max-[1080px]:hidden">
            <Sidebar activeMenu={activeMenu} />
          </div>
          <div className="h-screen grow overflow-y-auto pl-2 sm:pl-4 xl:pl-69">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;

// import React, { useContext } from "react";
// import { UserContext } from "../context/UserContext";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";

// const DashboardLayout = ({ activeMenu, children }) => {
//   const { user } = useContext(UserContext);
//   return (
//     <div className="transition-colors duration-300 bg-background">
//       <Navbar activeMenu={activeMenu} />

//       {user && (
//         <div className="flex">
//           <div className="max-[1080px]:hidden">
//             <Sidebar activeMenu={activeMenu} />
//           </div>

//           <div className="mx-5 grow">{children}</div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DashboardLayout;
