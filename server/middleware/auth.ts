import { getServerSession } from "#auth"

export default defineEventHandler(async event => {
    console.log(event)
    const session = await getServerSession(event)
    return session
})