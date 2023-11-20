// Importuje moduł DAO (Data Access Object) do komunikacji z bazą danych dotyczącą kategorii wydatków.
import expenseCategoryDAO from "../DAO/expenseCategoryDAO";

// Importuje moduły DAO dotyczące obsługi haseł, tokenów i użytkowników.
import PasswordDAO from "../DAO/passwordDAO";
import TokenDAO from "../DAO/tokenDAO";
import UserDAO from "../DAO/userDAO";
// Importuje moduł DAO do komunikacji z bazą danych dotyczącą budżetów miesięcznych.
import monthBudgetDAO from "../DAO/monthBudgetDAO";
// Importuje moduł DAO do komunikacji z bazą danych dotyczącą wydatków.
import expenseDAO from "../DAO/expenseDAO";

import sha1 from "sha1";
import business from "../business/business.container";
import applicationException from "../service/applicationException";

//Zarządza kategoriami wydatków.
function create(context) {
  //Tworzy nową kategorię wydatków lub aktualizuje istniejącą
  const createNewOrUpdate = async (expenseCategory) => {
    const limit = await expenseCategoryDAO.getAllForMonthlyBudgetId(
      expenseCategory.monthBudgetId
    );

    const monthBudget = await monthBudgetDAO.get(expenseCategory.monthBudgetId);
    // Tworzy tablicę zawierającą wszystkie kwoty limitów dla danej kategorii.
    const allCost = limit.map((cost) => cost.amount);

    // Sumuje wszystkie limity, aby uzyskać całkowity koszt.
    const cost = allCost.reduce((acc, value) => {
      return acc + parseInt(value);
    }, 0);

    // Oblicza dostępny budżet, odejmując koszty od ogólnego budżetu miesięcznego.
    const constantBudget = parseInt(monthBudget.amount) - cost;

    // Sprawdza, czy nowa kwota kategorii nie przekracza dostępnego budżetu.
    if (constantBudget - parseInt(expenseCategory.amount) < 0) {
      throw applicationException.new(
        applicationException.NOT_FOUND,
        "Budget out off limit"
      );
    }
    // Tworzy lub aktualizuje kategorię wydatków w bazie danych.
    const result = await expenseCategoryDAO.createNewOrUpdate(expenseCategory);
    if (result) {
      return result;
    }
  };
  //Pobiera kategorię wydatków na podstawie identyfikatora.
  const getById = async (id) => {
    const result = await expenseCategoryDAO.get(id);
    if (result) {
      return result;
    }
  };
  //Usuwa kategorię wydatków na podstawie identyfikatora.
  const removeById = async (expenseCategoryId) => {
    const expenseCategory = await expenseCategoryDAO.removeById(
      expenseCategoryId
    );
    if (expenseCategory) {
      return expenseCategory;
    }
  };
  //Pobiera wszystkie kategorie wydatków dla danego budżetu miesięcznego.
  const getAllForMonthlyBudgetId = async (expenseCategoryId) => {
    const expenseCategory = await expenseCategoryDAO.getAllForMonthlyBudgetId(
      expenseCategoryId
    );
    if (expenseCategory) {
      return expenseCategory;
    }
  };
  //Pobiera informacje o wydatkach w danej kategorii.
  const getExpense = async (expenseCategoryId) => {
    const expenseCategory = await expenseCategoryDAO.get(expenseCategoryId);
    const expenses = await expenseDAO.getAllForExpenseCategory(
      expenseCategoryId
    );

    // Oblicza całkowity koszt wydatków w danej kategorii.
    const expenseCost = expenses.reduce((acc, value) => {
      return acc + parseInt(value.amount);
    }, 0);

    // Tworzy obiekt z informacjami o kwocie i pozostałym budżecie w danej kategorii.
    const data = {
      amount: expenseCategory.amount,
      spend: parseInt(expenseCost),
    };
    // Zwraca dane w formie JSON.
    if (expenseCategory) {
      return JSON.stringify(data);
    }
  };
  // Zwraca zestaw funkcji zarządzających kategoriami wydatków.
  return {
    createNewOrUpdate: createNewOrUpdate,
    getById,
    removeById,
    getAllForMonthlyBudgetId,
    getExpense,
  };
}
// Eksportuje funkcję create jako obiekt.
export default {
  create: create,
};
