import express from "express";
import EmployeeController from "../controllers/EmployeeController";
import { isAuthenticated, isITManager } from "../utils/auth";

export default (router: express.Router) => {
  router.post(
    "/employees/onboard",
    isITManager,
    EmployeeController.onboardEmployee
  );
  router.put(
    "/employees/update",
    isITManager,
    EmployeeController.updateEmployee
  );
  router.put(
    "/employees/update-avatar",
    isITManager,
    EmployeeController.updateEmployeeAvatar
  );
  router.get(
    "/users/get/:userId",
    isAuthenticated,
    EmployeeController.fetchEmployeeById
  );
  router.get("/users/all", isITManager, EmployeeController.fetchEmployees);
};
