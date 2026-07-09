import React, { useState, useEffect } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import CardBalance from "../components/Fragments/CardBalance";
import CardGoal from "../components/Fragments/CardGoal";
import CardUpcomingBill from "../components/Fragments/CardUpcomingBill";
import CardRecentTransaction from "../components/Fragments/CardRecentTransaction";
import CardStatistic from "../components/Fragments/CardStatistic";
import CardExpenseBreakdown from "../components/Fragments/CardExpenseBreakdown";
import {
  transactions,
  expensesBreakdowns,
  balances,
  goals,
  expensesStatistics,
} from "../data";
import AppSnackbar from "../components/Elements/AppSnackbar";
import { getBillsService } from "../services/billService";

function Dashboard() {
  const [goalData, setGoalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [billsData, setBillsData] = useState([]);
  const [billsLoading, setBillsLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setGoalData(goals);
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to load goals",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await getBillsService();
        console.log("==========");
console.log(response);
console.log(response.data);
console.log(response.data[0]);
        console.log("Bills Array:", response.data);
        console.log("First Bill:", response.data[0]);
        const bills = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response?.bills)
              ? response.bills
              : [];
        setBillsData(bills);
      } catch (error) {
        console.error(error);
        setBillsData([]);
      } finally {
        setBillsLoading(false);
      }
    };
    fetchBills();
  }, []);

  return (
    <>
      <MainLayout>
        <div className="grid sm:grid-cols-12 gap-6">
          <div className="sm:col-span-4">
            <CardBalance data={balances} />
          </div>
          <div className="sm:col-span-4">
            <CardGoal data={goalData} loading={loading} />
          </div>
          <div className="sm:col-span-4">
            <CardUpcomingBill data={billsData} loading={billsLoading} />
          </div>
          <div className="sm:col-span-4 sm:row-span-2">
            <CardRecentTransaction data={transactions} />
          </div>
          <div className="sm:col-span-8">
            <CardStatistic data={expensesStatistics} />
          </div>
          <div className="sm:col-span-8">
            <CardExpenseBreakdown data={expensesBreakdowns} />
          </div>
        </div>
      </MainLayout>
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </>
  );
}

export default Dashboard;
