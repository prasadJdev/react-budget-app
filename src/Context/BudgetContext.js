import useLocalStorage from "../Hooks/UseLocalStorage";
import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
const BudgetContext = React.createContext();

export function useBudgets() {
  return useContext(BudgetContext);
}

export const UNCATEGORIZED_BUDGET_ID = "Uncategorised"

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }
  function addExpense({ description, amount, budgetId }) {
    setExpenses((prevExpense) => {
      return [
        ...prevExpense,
        {
          id: uuidv4(),
          description,
          amount,
          budgetId,
        },
      ];
    });
  }
  function addBudget({ name, max }) {
    setBudgets((prevBudget) => {
      if (prevBudget.find((budget) => budget.name === name)) return prevBudget;
      return [
        ...prevBudget,
        {
          id: uuidv4(),
          name,
          max,
        },
      ];
    });
  }
  function deleteBudget({ id }) {
    // TODO Deal with expenses
    setExpenses(prevExpenses =>{
      return prevExpenses.map((expense)=>{
        if(expense.budgetId !== id) return expense
        return{...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
      })
    })
    setBudgets((prevBudget) => {
      return prevBudget.filter((budget) => budget.id !== id);
    });
  }
  function deleteExpense({ id }) {
    setExpenses((prevExpense) => {
      return prevExpense.filter((expense) => expense.id !== id);
    });
  }
  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
