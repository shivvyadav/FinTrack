import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import SpinnerCustom from "../components/SpinnerCustom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) return <SpinnerCustom />;

  return user ? children : null;
};

export default ProtectedRoute;
