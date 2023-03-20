import { activitiesService } from "@/services/activities-service";
import { activitiesRepository } from "@/repositories/activities-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import {jest} from "@jest/globals"


        

describe("activities test", () => {
    it("should return activities list and empty user activities array", async () => {

        jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce((): any => {
            return {
                id: 1,
                name: "teste",
                cpf: "1111111111111",
                birthday: "01-01-01",
                phone: "11111111111",
                userId: 1,
                createdAt: "01-01-01",
                updatedAt: "01-01-01"
            }
        })
        jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce((): any => {
            return {
                id: 1,
                ticketTypeId: 3,
                enrollmentId: 1,
                status: "PAID",
                createdAt: "01-01-01",
                updatedAt: "01-01-01"
            }
        })
        jest.spyOn(ticketRepository, "findTickeWithTypeById").mockImplementationOnce((): any => {
            return {
                id: 1,
                ticketTypeId: 3,
                enrollmentId: 1,
                status: "PAID",
                createdAt: "01-01-01",
                updatedAt: "01-01-01",
                TicketType: {
                    id: 1,
                    name: 'party',
                    price: 1075,
                    isRemote: false,
                    includesHotel: true,
                  }
            }
        })
        jest.spyOn(activitiesRepository, "getDayActivity").mockImplementationOnce((): any => {
            return {
                id: 1,
                day: "quarta",
                date: "01-01-01",
                createdAt: "01-01-01",
                updatedAt: "01-01-01"
            }
        })
        jest.spyOn(activitiesRepository, "getActivities").mockImplementationOnce((): any => {
            return [{
                id: 1,
                name: "pilates",
                dayId: 1,
                place: "quadra",
                start: 15,
                end: 17,
                vacancies: 30
            }, {
                id: 2,
                name: "yoga",
                dayId: 1,
                place: "patio",
                start: 17,
                end: 19,
                vacancies: 40
            }]
        })
        jest.spyOn(activitiesRepository, "userActivities").mockImplementationOnce((): any => {
            return []
        })
        const { activities, userActivitiesArray } = await activitiesService.getActivities(1, "20-03-2023")
        expect(userActivitiesArray).toHaveLength(0)
        expect(activities).not.toHaveLength(0)
    })
    it("should return activities list and user activities array must not be empty ", async () => {

        jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce((): any => {
            return {
                id: 1,
                name: "teste",
                cpf: "1111111111111",
                birthday: "01-01-01",
                phone: "11111111111",
                userId: 1,
                createdAt: "01-01-01",
                updatedAt: "01-01-01"
            }
        })
        jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce((): any => {
            return {
                id: 1,
                ticketTypeId: 3,
                enrollmentId: 1,
                status: "PAID",
                createdAt: "01-01-01",
                updatedAt: "01-01-01"
            }
        })
        jest.spyOn(ticketRepository, "findTickeWithTypeById").mockImplementationOnce((): any => {
            return {
                id: 1,
                ticketTypeId: 3,
                enrollmentId: 1,
                status: "PAID",
                createdAt: "01-01-01",
                updatedAt: "01-01-01",
                TicketType: {
                    id: 1,
                    name: 'party',
                    price: 1075,
                    isRemote: false,
                    includesHotel: true,
                  }
            }
        })
        jest.spyOn(activitiesRepository, "getDayActivity").mockImplementationOnce((): any => {
            return {
                id: 1,
                day: "quarta",
                date: "01-01-01",
                createdAt: "01-01-01",
                updatedAt: "01-01-01"
            }
        })
        jest.spyOn(activitiesRepository, "getActivities").mockImplementationOnce((): any => {
            return [{
                id: 1,
                name: "pilates",
                dayId: 1,
                place: "quadra",
                start: 15,
                end: 17,
                vacancies: 30
            }, {
                id: 2,
                name: "yoga",
                dayId: 1,
                place: "patio",
                start: 17,
                end: 19,
                vacancies: 40
            }]
        })
        jest.spyOn(activitiesRepository, "userActivities").mockImplementationOnce((): any => {
            return [{
                id: 1,
                name: "pilates",
                dayId: 1,
                place: "quadra",
                start: 15,
                end: 17,
                vacancies: 30,
                activityId:1
            }]
        })
        const { activities, userActivitiesArray } = await activitiesService.getActivities(1, "20-03-2023")
        expect(userActivitiesArray).not.toHaveLength(0)
        expect(activities).not.toHaveLength(0)
    })
    
})