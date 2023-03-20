import { notFoundError } from "@/errors";
import eventRepository from "@/repositories/event-repository";
import { exclude } from "@/utils/prisma-utils";
import { Event } from "@prisma/client";
import dayjs from "dayjs";
//import { redis, connectRedis } from "@/config/redisDb";
import { createClient } from "redis";

async function getFirstEvent(): Promise<GetFirstEventResult> {
  const redis = createClient({
    url: process.env.REDIS_URL
  });
  await redis.connect();
  const cacheKey = "event"
  const cachedEvent = await redis.get(cacheKey)
  console.log(cachedEvent)
  console.log("aqui")

  if (cachedEvent) {
    console.log("boa")
    return JSON.parse(cachedEvent);
  } else {
    console.log("sql")
    const event = await eventRepository.findFirst();
    if (!event) throw notFoundError();
    redis.set(cacheKey, JSON.stringify(event))
    return exclude(event, "createdAt", "updatedAt");
  }
}

export type GetFirstEventResult = Omit<Event, "createdAt" | "updatedAt">;

async function isCurrentEventActive(): Promise<boolean> {
  const event = await eventRepository.findFirst();
  if (!event) return false;

  const now = dayjs();
  const eventStartsAt = dayjs(event.startsAt);
  const eventEndsAt = dayjs(event.endsAt);

  return now.isAfter(eventStartsAt) && now.isBefore(eventEndsAt);
}

const eventsService = {
  getFirstEvent,
  isCurrentEventActive,
};

export default eventsService;
