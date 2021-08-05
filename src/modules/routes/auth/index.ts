import fp from 'fastify-plugin'
import { sendApmError } from '../../../utils'

import AuthService from '../../services/auth-service'
import { LoginTO, LogoutTO, } from './schema'

export default fp((server, opts, next) => {
    const userService = new AuthService(server.db)

    server.post('/user/login', { schema: LoginTO }, async (request, reply) => {
        try {

            // request.body.ip = request.ip;
            const data = await userService.userLogin(server, request.body)

            return reply.code(200).send({
                success: true,
                message: 'Successful!',
                // data
            })

        } catch (error) {
            sendApmError(server, request, error)

            request.log.error(error)
            return reply.code(400).send({
                success: false,
                message: 'error login',
                error
            })
        }
    })

    server.post('/user/logout', { schema: LogoutTO }, async (request, reply) => {
        try {
            // console.log(request.headers);
            await userService.logOut(server, server.decoded)

            return reply.code(200).send({
                success: true,
                message: 'Successful!'
            })

        } catch (error) {
            sendApmError(server, request, error)

            request.log.error(error)
            return reply.code(400).send({
                success: false,
                message: 'error logout',
                error
            })
        }
    })


    next()
})
