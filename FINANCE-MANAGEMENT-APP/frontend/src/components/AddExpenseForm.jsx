import { useEffect, useRef, useState } from "react";

// rrd imports
import { useFetcher } from "react-router-dom";

// library imports
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import DatePicker from "react-datepicker";
import axios from "axios";

const AddExpenseForm = ({ budgets, refresh2 }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const formRef = useRef();
  const focusRef = useRef();
  const [amount, setAmount] = useState(""); //dodane
  const [name, setName] = useState(""); //tutaj nwm czy dobrze bo w dao było
  const [budget, setBudget] = useState(budgets?.at(0)._id);

  useEffect(() => {
    if (!isSubmitting) {
      // clear form
      formRef.current.reset();
      // reset focus
      focusRef.current.focus();
    }
  }, [isSubmitting]); //tutaj też

  const sendData = () => {
    console.log(budgets);
    axios({
      method: "post",
      url: "http://localhost:3000/api/expense/create",
      data: {
        expenseCategoryId: budget,
        name: name,
        amount: amount,
      },
    })
      .then((response) => {
        refresh2();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Dodaj nowy{" "}
        <span className="accent">
          {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
        </span>{" "}
        Expense
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Nazwa wydatku</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g., Coffee"
              ref={focusRef}
              required
              value={name} //tutaj
              onChange={(e) => setName(e.target.value)} //ten input ?
            />
          </div>

          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Kwota</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g., 3.50"
              required
              value={amount} // tutaj
              onChange={(e) => setAmount(e.target.value)} //ten input ?
            />
          </div>
        </div>
        <div className="grid-xs">
          <label htmlFor="newExpenseBudget">Kategoria budżetu</label>
          <select
            onChange={(e) => {
              console.log(e.target.value);
              setBudget(e.target.value);
            }}
            name="newExpenseBudget"
            id="newExpenseBudget"
            defaultValue={budgets?.at(0)._id}
            value={budget}
            required
          >
            {budgets
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((budget) => {
                return (
                  <option selected key={budget._id} value={budget._id}>
                    {budget.name}
                  </option>
                );
              })}
          </select>
        </div>
        <input type="hidden" name="_action" value="createExpense" />
        <button
          onClick={() => sendData()}
          type="submit"
          className="btn btn--dark"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span>Podsumowanie ...</span>
          ) : (
            <>
              <span>Dodaj wydatek</span>
              <PlusCircleIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};
export default AddExpenseForm;
