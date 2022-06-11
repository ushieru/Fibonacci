import { createClient } from 'redis'

export const redis = createClient({ url: process.env.REDIS_URL as string })
redis.connect()

export const publisher = redis.duplicate()
publisher.connect()