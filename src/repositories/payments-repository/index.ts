import { prisma } from "@/config";
import { CreatePaymentParams, GetTicketsByEnrollmentId } from "@/services";

async function getPaymentByTicketId(ticketId:number) {
    return prisma.payment.findFirst({
        where:{
            ticketId
        }
    })
}
async function createPayment(paymentParams:CreatePaymentParams, ticketIdExist: GetTicketsByEnrollmentId ) {

    const cardDataToString = String(paymentParams.cardData.number)

    const lastDigits = cardDataToString.slice(-4)


    return prisma.payment.create({
        data:{
            ticketId:ticketIdExist.id,
            cardIssuer:paymentParams.cardData.issuer,
            cardLastDigits:lastDigits,
            value:ticketIdExist.TicketType.price
        }
    })
    
}

const paymentsRepository = {
    getPaymentByTicketId,
    createPayment
};

export default paymentsRepository;