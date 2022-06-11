import { createClient } from 'redis'

const redisClient = createClient({ url: process.env.REDIS_URL })
const subscriber = redisClient.duplicate();
const fib = (n) => {
    if (n <= 1) return 1
    return fib(n - 1) + fib(n - 2)
}

(async () => {
    await subscriber.connect()
    await redisClient.connect()
    await subscriber.subscribe('insert',
        async (message) => {
            const result = fib(parseInt(message))
            console.log(`Inserting ${message} with result ${result}`)
            await redisClient.hSet('values', message, result)
        })
})()