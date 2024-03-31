import { getServerSession } from "#auth"
import { Session } from "next-auth"
import { getToken } from '#auth'

declare module 'h3' {
    interface H3EventContext {
        session: Session | null
        userId?: string
    }
}

export default defineEventHandler(async event => {
    event.context.session = await getServerSession(event)
    event.context.userId = (await getToken({ event }))?.sub
})