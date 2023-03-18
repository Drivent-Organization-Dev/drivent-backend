import { notFoundError, unauthorizedError } from "@/errors";
import { activitiesRepository } from "@/repositories/activities-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";



async function listActivities(userId: number, day: string) {

    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) {
        throw notFoundError();
    }

    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
    if ( !ticket || ticket.status !== "PAID")  throw unauthorizedError();


    const ticketType = await ticketRepository.findTickeWithTypeById(ticket.id)
    if (ticketType.TicketType.isRemote) throw unauthorizedError()
}

async function getActivities(userId: number, day: string) {

    await listActivities(userId, day);

    const dayId = await activitiesRepository.getDayActivity(day)
    if (!dayId) throw notFoundError

    const activities = await activitiesRepository.getActivities(dayId.id)

    return activities;

}


export const activitiesService = {
    getActivities
}