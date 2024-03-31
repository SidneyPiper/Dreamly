import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return 'success'
})

