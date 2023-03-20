import { enrollAcitivity, listActivities } from "@/controllers/activities-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const activitiesRouter = Router()

activitiesRouter
    .all("/*", authenticateToken)
    .get("/", listActivities)
    .post("/", enrollAcitivity)


export { activitiesRouter }

