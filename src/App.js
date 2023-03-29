import "./App.css";
import Container from "react-bootstrap/Container";
import { Button, Stack } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import UncategorisedBudgetCard from "./components/UncategorisedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./Context/BudgetContext";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

  const [viewExpensesModal, setviewExpensesModal] = useState(false);

  const [viewExpensesModalId, setviewExpensesModalId] = useState();

  const { budgets, getBudgetExpenses } = useBudgets();
  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="dark" onClick={() => setShowAddBudgetModal(true)}>
            ADD BUDGET
          </Button>
          <Button variant="outline-dark" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          className=""
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr)",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                name={budget.name}
                key={budget.id}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={() => setviewExpensesModalId(budget.id)}
              />
            );
          })}
          <UncategorisedBudgetCard
            onAddExpenseClick={() => openAddExpenseModal()}
            onViewExpenseClick={() =>
              setviewExpensesModalId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => {
          setShowAddBudgetModal(false);
        }}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => {
          setShowAddExpenseModal(false);
        }}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalId}
        handleClose={() => {
          setviewExpensesModalId();
        }}
      />
    </>
  );
}

export default App;
