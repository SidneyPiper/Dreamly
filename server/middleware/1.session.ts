import { getServerSession } from "#auth"
import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import { getToken } from '#auth'
import { Prisma } from "@prisma/client"

declare module 'h3' {
    interface H3EventContext {
        session: Session | null
        token: JWT | null
        user: any
    }
}

export default defineEventHandler(async event => {
    event.context.session = await getServerSession(event)
    event.context.token = await getToken({ event })
})