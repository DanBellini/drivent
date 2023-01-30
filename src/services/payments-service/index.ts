import { notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { GetTicketsByEnrollmentId } from "../tickets-service";

async function getPayments(userId:number, ticketId:number) {
    const ticketIdExist:GetTicketsByEnrollmentId = await ticketsRepository.getTicketFromIdTicket(ticketId);

    if(!ticketIdExist){
        throw notFoundError()
    };

    const enrollmentIdIsValid = await enrollmentRepository.findEnrollmentByUserId(userId);

    if(ticketIdExist.enrollmentId !== enrollmentIdIsValid.id){
        throw unauthorizedError()
    };

    return await paymentsRepository.getPaymentByTicketId(ticketId);
}

async function createPayment(paymentParams: CreatePaymentParams, userId:number) {
    const {ticketId} = paymentParams
    const ticketIdExist: GetTicketsByEnrollmentId = await ticketsRepository.getTicketFromIdTicket(ticketId);

    console.log(ticketId)
    if(!ticketIdExist){
        throw notFoundError()
    };
    const enrollmentIdIsValid = await enrollmentRepository.findEnrollmentByUserId(userId);
    console.log(enrollmentIdIsValid)
    if(ticketIdExist.enrollmentId !== enrollmentIdIsValid.id){
        throw unauthorizedError()
    };

    return await paymentsRepository.createPayment(paymentParams, ticketIdExist)
};

export type CreatePaymentParams ={
	ticketId: number
	cardData: {
		issuer: string
        number: number
        name: string
        expirationDate: Date
        cvv: number
	}
};

const paymentsService = {
    getPayments,
    createPayment
};

export default paymentsService;