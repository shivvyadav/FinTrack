import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/DashboardLayout";
import IncomeOverview from "../../components/income/IncomeOverview";
import AddIncomeForm from "../../components/income/AddIncomeForm";
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";
import IncomeList from "../../components/income/IncomeList";
const Income = () => {
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState({
    show: false,
    data: null,
  });

  //get all income details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/income/get-income`,
        { withCredentials: true },
      );
      if (res.data?.success) {
        setIncomeData(res.data.incomes || []);
      }
    } catch (err) {
      console.log("getUser error:", err?.response?.status, err?.response?.data);
      setIncomeData(null);
    } finally {
      setLoading(false);
    }
  };

  //handle add income
  const handleAddIncome = async (incomeData) => {
    const { icon, source, amount, date } = incomeData;

    if (!source.trim()) {
      toast.error("Source is required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Valid amount is required");
      return;
    }

    if (!date) {
      toast.error("Valid date is required");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/income/add-income`,
        { icon, source, amount, date },
        { withCredentials: true },
      );
      if (res.data?.success) {
        setOpenAddIncomeModel(false);
        toast.success("Income added successfully");
        fetchIncomeDetails();
      }
    } catch (err) {
      console.log("getUser error:", err?.response?.status, err?.response?.data);
    }
  };

  //delete income
  const handleDeleteIncome = async (incomeId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/income/delete-income/${incomeId}`,
        { withCredentials: true },
      );
      if (res.data?.success) {
        setShowDeleteAlert({ show: false, data: null });
        toast.success("Income deleted successfully");
        fetchIncomeDetails();
      }
    } catch (err) {
      console.log("getUser error:", err?.response?.status, err?.response?.data);
    }
  };

  //handle download income data
  const handleDownloadIncomeData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/income/download-income`,
        { withCredentials: true, responseType: "blob" },
      );
      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "income.xlsx";
      a.click();
    } catch (err) {
      console.log("getUser error:", err?.response?.status, err?.response?.data);
    }
  };

  React.useEffect(() => {
    fetchIncomeDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="mx-auto my-5 pt-15 pr-2 sm:pr-4">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setShowDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeData}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={showDeleteAlert.show}
          onClose={() => setShowDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => handleDeleteIncome(showDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
