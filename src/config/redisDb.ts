import { createClient } from "redis"

export async function createRedisClient() {
    const redis = createClient({
        url: process.env.REDIS_URL
    });
    await redis.connect();
    return redis;
}
