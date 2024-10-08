export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const name = body.name

    try {
        await event.context.prisma.user.update({
            where: {
                id: event.context.session!.user.id,
            },
            data: {
                name: name,
            }
        })

        return {
            data: {
                statusCode: 200,
                statusMessage: 'Changed username successfully.'
            }
        }
    } catch (error) {
        console.log(error);
        throw createError({
            statusCode: 500,
            statusMessage: 'An internal server error occurred. (Unique)'
        })
    }
})