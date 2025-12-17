import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const updateUser = (userData) => setUser(userData);
  const clearUser = () => setUser(null);

  // fetch user on provider mount (restores session if cookie present)
  useEffect(() => {
    let isMounted = true;
    const getUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/auth/user`,
          { withCredentials: true },
        );
        if (isMounted && res.data?.success) {
          setUser(res.data.user);
        }
      } catch (err) {
        setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getUser();
    return () => (isMounted = false);
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
