import express from "express";
import generalRoutes from "./generalRoutes";
import userRoutes from "./userRoutes";
import employeeRoutes from "./employeeRoutes";

const router = express.Router();

export default (): express.Router => {
  generalRoutes(router);
  userRoutes(router);
  employeeRoutes(router);

  return router;
};
