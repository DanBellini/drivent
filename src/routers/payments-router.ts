import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";

const paymentsRouter = Router();

paymentsRouter
            .all("/*", authenticateToken)
            .get("/payments")
            .post("/tickets/process");

export { paymentsRouter };