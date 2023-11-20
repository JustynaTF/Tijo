import business from "../business/business.container";
import applicationException from "../service/applicationException";
import admin from "../middleware/admin";
import auth from "../middleware/auth";

const expenseCategoryEndpoint = (router) => {
  router.post(
    "/api/expenseCategory/create",
    async (request, response, next) => {
      try {
        const result = await business
          .getExpenseCategoryManager(request)
          .createNewOrUpdate(request.body);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  router.delete(
    "/api/expenseCategory/logout/:expenseCategoryId",
    auth,
    async (request, response, next) => {
      try {
        let result = await business
          .getExpenseCategoryManager(request)
          .removeById(request.body.expenseCategoryId);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  router.get(
    "/api/expenseCategory/get/:expenseCategoryId",
    async (request, response, next) => {
      try {
        const result = await business
          .getExpenseCategoryManager(request)
          .get(request.params.expenseCategoryId);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  router.get(
    "/api/expenseCategory/getAll/:monthlyBudget",
    async (request, response, next) => {
      try {
        const result = await business
          .getExpenseCategoryManager(request)
          .getAllForMonthlyBudgetId(request.params.monthlyBudget);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );

  router.get(
    "/api/expenseCategory/expense/:expenseCategoryId",
    async (request, response, next) => {
      try {
        const result = await business
          .getExpenseCategoryManager(request)
          .getExpense(request.params.expenseCategoryId);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    }
  );
};

export default expenseCategoryEndpoint;
