import Fastify from 'fastify'
import { prisma } from './lib/prisma'
import { publisher, redis } from './lib/redis'

const fastify = Fastify({ logger: true })

fastify.register(require('@fastify/cors'), { origin: '*' })

fastify.get('/api/', (_request, reply) => reply.send({ hello: 'world' }))

fastify.get('/api/values/all', async (request, reply) => {
    const values = await prisma.values.findMany()
    return values
})

fastify.get('/api/values/current', async (request, reply) => {
    const values = await redis.hGetAll('values')
    return values
})

fastify.post<{ Body: { index: number } }>('/api/values', async (request, reply) => {
    const { index } = request.body

    if (index > 40) return reply.status(422).send({ error: 'Index too high' })

    await redis.hSet('values', index, 'Nothing yet!')
    await publisher.publish('insert', index.toString())
    await prisma.values.create({ data: { number: index } })

    return { success: true }
})

fastify.listen({ port: 4000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    console.log(`server on ${address}`)
})