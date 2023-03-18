import { prisma } from "@/config";



async function getDayActivity(day: string) {

    return prisma.day.findFirst({
        where: {
            day,
        },
        select: {
            id: true
        }
    })
}
async function getActivities(dayId: number) {

    return prisma.activity.findMany({
        where: {
            dayId
        }
    })
}

async function getActivityByID(activityId: number) {
    return prisma.activity.findFirst({
        where: {
            id: activityId
        }
    })
}

async function enrollActivity(userId: number, activityId: number) {

    return prisma.vacancies.create({
        data: {
            userId,
            activityId
        }

    })
}

async function fillVacancy(activityId: number) {

    return prisma.activity.update({
        where: {
            id: activityId,
        },
        data: {
            vacancies: {
                decrement: 1
            }
        }
    })
}

export const activitiesRepository = {
    getDayActivity,
    getActivities,
    getActivityByID,
    enrollActivity,
    fillVacancy
}