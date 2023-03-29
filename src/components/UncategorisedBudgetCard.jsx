import React from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../Context/BudgetContext";
import BudgetCard from "./BudgetCard";

export default function UncategorisedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );
  if (amount === 0) return null;

  return( <BudgetCard name="Uncategorised" amount={amount} {...props} />);
}
