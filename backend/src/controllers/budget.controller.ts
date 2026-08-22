import { Request, Response } from "express";
import * as budgetService from "../services/budget.service";
import { BudgetError } from "../services/budget.service";
import { errorResponse, successResponse } from "../utils/apiResponse";

const handleBudgetError = (res: Response, error: unknown) => {
  if (error instanceof BudgetError) {
    return errorResponse(res, error.message, error.error, error.statusCode);
  }

  return errorResponse(res, "Internal server error", {}, 500);
};

const requireUserId = (req: Request, res: Response): string | null => {
  if (!req.userId) {
    errorResponse(res, "Unauthorized", {}, 401);
    return null;
  }

  return req.userId;
};

const getParam = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
};

export const getTripBudget = async (req: Request, res: Response) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) {
      return;
    }

    const budget = await budgetService.getTripBudget(
      userId,
      getParam(req.params.tripId)
    );

    return successResponse(res, "Budget calculated", budget);
  } catch (error) {
    return handleBudgetError(res, error);
  }
};
