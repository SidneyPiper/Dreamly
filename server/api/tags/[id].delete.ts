export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    try {
        await event.context.prisma.user.update({
            where: {id: event.context.userId},
            data: {
                tags: {
                    delete: {
                        id: id
                    }
                }
            }
        })
    } catch (error) {
        console.log(error);
        throw createError({
            statusCode: 500,
            statusMessage: 'An internal server error occurred.'
        })
    }

    return {
        data: {
            statusCode: 200,
            statusMessage: 'The tag was successfully deleted.'
        }
    }

})