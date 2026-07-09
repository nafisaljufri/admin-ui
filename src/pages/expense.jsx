import React, { useEffect, useState } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import { getExpensesService } from "../services/expenseService";
import CardExpenses from "../components/Fragments/CardExpenses";
import Icon from "../components/Elements/Icon";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function ExpensePage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);

        const result = await getExpensesService();

        const expenseData = result.map((item) => ({
          ...item,

          icon:
            item.category === "housing" ? (
              <Icon.House />
            ) : item.category === "food" ? (
              <Icon.Food />
            ) : item.category === "transportation" ? (
              <Icon.Transport />
            ) : item.category === "shopping" ? (
              <Icon.Shopping />
            ) : item.category === "entertainment" ? (
              <Icon.Gamepad />
            ) : (
              <Icon.Other />
            ),

          arrow:
            item.percentage >= 15 ? (
              <Icon.ArrowUp className="text-red-500" />
            ) : (
              <Icon.ArrowDown className="text-green-500" />
            ),
        }));

        setExpenses(expenseData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <>
      <MainLayout>
        <h2 className="text-2xl font-semibold mb-6">Expenses Comparison</h2>

        <CardExpenses data={expenses} />
      </MainLayout>

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default ExpensePage;
