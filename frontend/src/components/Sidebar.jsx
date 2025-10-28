import React, { useContext } from "react";
import ThemeToggle from "./ThemeToggle";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  HandCoins,
  WalletMinimal,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { toast } from "react-hot-toast";

const menuItems = [
  { id: 1, name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { id: 2, name: "Income", icon: HandCoins, path: "/income" },
  { id: 3, name: "Expense", icon: WalletMinimal, path: "/expense" },
  { id: 4, name: "Logout", icon: LogOut, path: "/logout" },
];

const Sidebar = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = async (item) => {
    if (item.path === "/logout") {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/auth/logout`,
          {},
          { withCredentials: true },
        );
        if (res.data.success) {
          clearUser();
          toast.success(res.data.message);
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="bg-foreground border-border sticky top-[61px] z-30 h-[calc(100vh-61px)] w-64 border-r p-5 transition-colors duration-300">
      <ThemeToggle className="" />
      <div className="mt-3 mb-7 flex flex-col items-center justify-center gap-3">
        {user?.profileImg ? (
          <img
            src={user.profileImg}
            alt="Profile"
            className="size-20 rounded-full bg-slate-400"
          />
        ) : (
          <div className="border-border bg-background size-20 overflow-hidden rounded-full border">
            <img
              src="../../profile.jpg"
              alt="avatar"
              className="h-full w-full"
            />
          </div>
        )}
        <h5 className="text-primary leading-6 font-medium">
          {user?.name || ""}
        </h5>
      </div>
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item)}
          className={`mb-3 flex w-full items-center gap-4 rounded-lg px-6 py-3 text-[15px] font-medium transition-colors duration-200 ${
            activeMenu === item.name ? "btn" : "text-primary hover:bg-muted"
          }`}
        >
          <item.icon className="h-6 w-6" />
          <span>{item.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
