import ticketsService, { CreateTicketParams } from "@/services/tickets-service";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";

export async function getTicketsTypes(req: Request, res: Response) {
    try {
        const ticketsTypes = await ticketsService.allTicketsType();
        if(ticketsTypes.length === 0){
            return res.status(httpStatus.OK).send(ticketsTypes);
        }
        return res.status(httpStatus.OK).send(ticketsTypes);
    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    };
};

export async function getUserTicket(req:AuthenticatedRequest, res:Response) {
    const {userId} = req;
    try {
        const userTicket = await ticketsService.getTicketFromUser(userId);
        
        return res.status(httpStatus.OK).send(userTicket[0]);
    } catch (error) {
        if(error.name === "NotFoundError"){
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    };
};

export async function postNewTicket(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { ticketTypeId } = req.body as CreateTicketParams;

    try {
        const newTickets = await ticketsService.createNewTicket(ticketTypeId, userId)

        return res.status(httpStatus.CREATED).send(newTickets)
    } catch (error) {
        if(error.name === "NotFoundError"){
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
}
