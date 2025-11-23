import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import DashboardLayout from "../../components/DashboardLayout";
import InfoCard from "../../components/cards/InfoCard";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import ExpenseTransactions from "../../components/dashboard/ExpenseTransactions";
import Last60DaysExpenses from "../../components/dashboard/Last60DaysExpenses";
import FinanceOverview from "../../components/dashboard/FinanceOverview";
import RecentIncomeWithChart from "../../components/dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/dashboard/RecentIncome";
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
      <div className="pt-20 pr-1 pb-4 sm:pr-4">
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

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions || []}
          />
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />
          {dashboardData?.last60daysExpenseTransaction.length > 0 && (
            <ExpenseTransactions
              transactions={dashboardData?.last60daysExpenseTransaction || []}
              onSeeMore={() => navigate("/expense")}
            />
          )}
          {dashboardData?.last60daysExpenseTransaction.length > 0 && (
            <Last60DaysExpenses
              data={dashboardData?.last60daysExpenseTransaction || []}
            />
          )}

          {dashboardData?.last60daysIncomeTransaction?.length > 0 && (
            <RecentIncomeWithChart
              data={
                dashboardData?.last60daysIncomeTransaction?.slice(0, 4) || []
              }
              totalIncome={dashboardData?.last60daysIncomeBalance || 0}
            />
          )}
          {dashboardData?.last60daysIncomeTransaction?.length > 0 && (
            <RecentIncome
              transactions={dashboardData?.last60daysIncomeTransaction || []}
              onSeeMore={() => navigate("/income")}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
