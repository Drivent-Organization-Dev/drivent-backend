import { AuthenticatedRequest } from "@/middlewares";
import { activitiesService } from "@/services/activities-service";
import { Response } from "express";
import httpStatus, { BAD_REQUEST } from "http-status";



export async function listActivities(req: AuthenticatedRequest, res: Response) {
    try {
        const day = req.query.day as string
        const { userId } = req;

        if (!day) return res.sendStatus(BAD_REQUEST)

        const activities = await activitiesService.getActivities(userId, day)

        return res.status(httpStatus.OK).send(activities)


    } catch (error) {
        if (error.name === "UnauthorizedError") {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

export async function enrollAcitivity(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req;
        const { activityId } = req.body;
        console.log(activityId)

        if (!activityId) return res.sendStatus(BAD_REQUEST)

        await activitiesService.enrollActivity(userId, activityId)

        return res.sendStatus(httpStatus.OK)

    } catch (error) {
        if (error.name === "UnauthorizedError") {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}