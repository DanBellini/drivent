import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketsTypes, getUserTicket, postNewTicket } from "@/controllers/tickets-controller";
import { createTicketSchema } from "@/schemas/ticket-schemas";

const ticketsRouter = Router();

ticketsRouter
            .all("/*", authenticateToken)
            .get("/tickets/types", getTicketsTypes)
            .get("/tickets", getUserTicket)
            .post("/tickets", validateBody(createTicketSchema),postNewTicket);
 
export {ticketsRouter};