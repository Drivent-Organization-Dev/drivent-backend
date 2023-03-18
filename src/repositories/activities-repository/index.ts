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


export const activitiesRepository = {
    getDayActivity,
    getActivities
}