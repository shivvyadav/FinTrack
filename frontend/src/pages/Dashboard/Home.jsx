import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
import InfoCard from "../../components/cards/InfoCard";
import { useNavigate } from "react-router-dom";
import { HandCoins, WalletMinimal, CreditCard } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/dashboard`,
        { withCredentials: true },
      );
      if (res.data?.success) {
        setDashboardData(res.data);
      }
    } catch (err) {
      console.log("getUser error:", err?.response?.status, err?.response?.data);
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="mx-auto my-5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <InfoCard
            icon={<CreditCard />}
            label="Total Balance"
            value={dashboardData?.totalBalance || 0}
            color="bg-blue-400"
          />
          <InfoCard
            icon={<WalletMinimal />}
            label="Total Income"
            value={dashboardData?.totalIncome || 0}
            color="bg-orange-400"
          />
          <InfoCard
            icon={<HandCoins />}
            label="Total Expenses"
            value={dashboardData?.totalExpense || 0}
            color="bg-red-400"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
