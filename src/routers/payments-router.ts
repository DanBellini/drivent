import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPaymentsFromTickeId, postPayment } from "@/controllers/payments-controller";
import { createPaymentSchema } from "@/schemas/payments-schema";

const paymentsRouter = Router();

paymentsRouter
            .all("/*", authenticateToken)
            .get("/payments", getPaymentsFromTickeId)
            .post("/tickets/process", validateBody(createPaymentSchema), postPayment);

export { paymentsRouter };