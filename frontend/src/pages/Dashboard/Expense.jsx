import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/DashboardLayout";
import ExpenseOverview from "../../components/expense/ExpenseOverview";
import AddExpenseForm from "../../components/expense/AddExpenseForm";
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";
import ExpenseList from "../../components/expense/ExpenseList";

const Expense = () => {
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState({
    show: false,
    data: null,
  });

  //get all expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/expense/get-expense`,
        { withCredentials: true },
      );
      if (res.data?.success) {
        setExpenseData(res.data.expenses || []);
      }
    } catch (err) {
      console.log("getUser error:", err?.response?.status, err?.response?.data);
      setExpenseData(null);
    } finally {
      setLoading(false);
    }
  };

  //handle add expense
  const handleAddExpense = async (expenseData) => {
    const { icon, category, amount, date } = expenseData;

    if (!category.trim()) {
      toast.error("category is required");
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
        `${import.meta.env.VITE_BASE_URL}/api/expense/add-expense`,
        { icon, category, amount, date },
        { withCredentials: true },
      );
      if (res.data?.success) {
        setOpenAddExpenseModel(false);
        toast.success("Expense added successfully");
        fetchExpenseDetails();
      }
    } catch (err) {
      console.log("getUser error:", err?.response?.status, err?.response?.data);
    }
  };

  //delete expense
  const handleDeleteExpense = async (expenseId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/expense/delete-expense/${expenseId}`,
        { withCredentials: true },
      );
      if (res.data?.success) {
        setShowDeleteAlert({ show: false, data: null });
        toast.success("Expense deleted successfully");
        fetchExpenseDetails();
      }
    } catch (err) {
      console.log("getUser error:", err?.response?.status, err?.response?.data);
    }
  };

  //handle download income data
  const handleDownloadExpenseData = async () => {};

  React.useEffect(() => {
    fetchExpenseDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="mx-auto my-5 pt-15 pr-2 sm:pr-4">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModel(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setShowDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseData}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModel}
          onClose={() => setOpenAddExpenseModel(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={showDeleteAlert.show}
          onClose={() => setShowDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => handleDeleteExpense(showDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
