import validate from "validate.js";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const id = getRouterParam(event, 'id')

    const error = validate(body, {
        quality: {
            numericality: {
                onlyInteger: true,
                greaterThanOrEqualTo: 1,
                lessThanOrEqualTo: 5
            },
            type: "integer"
        },
        duration: {
            numericality: {
                onlyInteger: true,
                greaterThanOrEqualTo: 0,
                lessThanOrEqualTo: 48 * 60
            },
            type: "integer"
        }
    })

    if (error) throw createError({
        statusCode: 400,
        statusMessage: 'The provided data was flawed.',
        data: error
    })

    const quality = body.quality ?? null
    const duration = body.duration ?? null

    try {
        const trackerData = await event.context.prisma.trackerData.update({
            where: {
                userId: event.context.session!.user.id,
                id: id
            },
            data: {
                quality: quality,
                duration: duration
            }
        })

        return {
            data: {
                statusCode: 200,
                statusMessage: 'The tracker data was successfully updated.',
                data: trackerData
            }
        }
    } catch (error) {
        console.log(error);
        throw createError({
            statusCode: 500,
            statusMessage: 'An internal server error occurred.'
        })
    }
})