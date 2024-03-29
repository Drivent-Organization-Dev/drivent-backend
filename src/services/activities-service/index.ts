import { notFoundError, unauthorizedError } from "@/errors";
import { activitiesRepository } from "@/repositories/activities-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";



async function listActivities(userId: number) {

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

    await listActivities(userId);

    const dayId = await activitiesRepository.getDayActivity(day);
    if (!dayId) throw notFoundError();

    const activities = await activitiesRepository.getActivities(dayId.id);
    const userActivities = await activitiesRepository.userActivities(userId)
    const userActivitiesArray = []
    
    for (let i = 0; i < userActivities.length; i++) {
        userActivitiesArray.push(userActivities[i].activityId)
    }
    console.log(userActivitiesArray)

    return ({activities, userActivitiesArray});

}

async function enrollActivity(userId: number, activityId: number) {
    await listActivities(userId);

    const activity  = await activitiesRepository.getActivityByID(activityId);
    if (activity.vacancies === 0) throw unauthorizedError();

    await activitiesRepository.enrollActivity(userId, activityId);
    await activitiesRepository.fillVacancy(activityId)

    return
}


export const activitiesService = {
    getActivities,
    enrollActivity
}