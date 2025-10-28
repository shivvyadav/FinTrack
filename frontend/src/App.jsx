import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import UserProvider from "./context/UserContext";

import Home from "./pages/Dashboard/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import VerifyCode from "./pages/Auth/VerifyCode";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";

const Layout = () => {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
};
function App() {
  const Router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/income",
          element: <Income />,
        },
        {
          path: "/expense",
          element: <Expense />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/verify-code",
          element: <VerifyCode />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
