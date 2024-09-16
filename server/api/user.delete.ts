export default defineEventHandler(async (event) => {
    try {
        await event.context.prisma.user.delete({
            where: {id: event.context.session!.user.id},
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
            statusMessage: 'The user was successfully deleted.'
        }
    }

})