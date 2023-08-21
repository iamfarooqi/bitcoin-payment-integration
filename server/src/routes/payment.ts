import express from "express";
import { checkout } from "../controllers/payment";

const paymentRoutes = express.Router();

paymentRoutes.post("/checkout", checkout);

export default paymentRoutes;
