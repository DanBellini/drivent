import { prisma } from "@/config";
import { TicketType, Prisma  } from "@prisma/client";

async function getTicketsTypes(): Promise<TicketType[]> {
    return prisma.ticketType.findMany()
};

async function getTicketsByEnrollmentId(enrollmentId: number) {
    return prisma.ticket.findMany({
        where: {
            enrollmentId
        },
        include:{
            TicketType:true
        }
        
    })
}

async function getTicketTypeFromTicketTypeId(ticketTypeId:number) {
    return prisma.ticketType.findUnique({
        where: {
            id: ticketTypeId
        }
    })
}

async function createNewTicket(ticketTypeId:number, enrollmentId:number) {
    return await prisma.ticket.create({
        data:{
            ticketTypeId,
            enrollmentId,
            status: "RESERVED"
        }
    })
    
}

async function getTicketFromIdTicket(ticketId:number) {
    return await prisma.ticket.findUnique({
        where:{
            id: ticketId
        },
        include:{
            TicketType: true
        }
    })
    
}

const ticketsRepository = {
    getTicketsTypes,
    getTicketsByEnrollmentId,
    getTicketTypeFromTicketTypeId,
    createNewTicket,
    getTicketFromIdTicket
};

export default ticketsRepository;