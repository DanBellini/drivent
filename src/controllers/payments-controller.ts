import { AuthenticatedRequest } from "@/middlewares";
import paymentsService, { CreatePaymentParams } from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPaymentsFromTickeId(req:AuthenticatedRequest, res:Response) {
    const {userId} = req;
    const {ticketId} = req.query;

    const newTicketId = Number(ticketId);
    
    if(!newTicketId){
        return res.sendStatus(httpStatus.BAD_REQUEST);
    };

    try {
        const payment = await paymentsService.getPayments(userId, newTicketId);
        
        return res.status(httpStatus.OK).send(payment);
    } catch (error) {
        if(error.name === "NotFoundError"){
            return res.sendStatus(httpStatus.NOT_FOUND)
        };
        if(error.name === "UnauthorizedError"){
            return res.sendStatus(httpStatus.UNAUTHORIZED)
        };
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    };
};

export async function postPayment (req:AuthenticatedRequest, res: Response) {
    const paymentParams = req.body as CreatePaymentParams;
    const {userId} = req;

    try {
        const payment = await paymentsService.createPayment(paymentParams, userId)

        res.status(httpStatus.OK).send(payment);
    } catch (error) {
        if(error.name === "NotFoundError"){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        };
        if(error.name === "UnauthorizedError"){
            return res.sendStatus(httpStatus.UNAUTHORIZED)
        };
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    };
};