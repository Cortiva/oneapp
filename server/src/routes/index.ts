import express from "express";
import generalRoutes from "./generalRoutes";

const router = express.Router();

export default (): express.Router => {
  generalRoutes(router);

  return router;
};
