import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { Ticket, TicketType } from "@prisma/client";

async function allTicketsType(){
    return await ticketsRepository.getTicketsTypes();
};

async function getTicketFromUser(userId: number) {
    const enrollment =  await enrollmentRepository.findEnrollmentByUserId(userId)

    if(!enrollment){
        throw notFoundError()
    }
    
    const tickets: GetTicketsByEnrollmentId[] = await ticketsRepository.getTicketsByEnrollmentId(enrollment.id)

    if(tickets.length === 0){
        throw notFoundError()
    }
    return tickets;
};

export type GetTicketsByEnrollmentId = Ticket & {
    TicketType: TicketType;
}

async function createNewTicket(ticketTypeId:number, userId: number) {
    const enrollment =  await enrollmentRepository.findEnrollmentByUserId(userId)

    if(!enrollment){
        throw notFoundError()
    }

    const ticketType = await ticketsRepository.getTicketTypeFromTicketTypeId(ticketTypeId)
    if(!ticketType){
        throw notFoundError()
    }

    const newTickets = await ticketsRepository.createNewTicket(ticketType.id, enrollment.id)
    const ticketId = newTickets.id

    return await ticketsRepository.getTicketFromIdTicket(ticketId);
};

export type CreateTicketParams = Pick<Ticket, "ticketTypeId">

const ticketsService = {
    allTicketsType,
    getTicketFromUser,
    createNewTicket
};

export default ticketsService;



