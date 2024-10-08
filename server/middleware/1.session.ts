import {SessionData} from "h3";
import {getServerSession} from "#auth";

declare module 'h3' {
    interface H3EventContext {
        session: SessionData | null
    }
}

export default defineEventHandler(async (event): Promise<void> => {
    event.context.session = await getServerSession(event)
})