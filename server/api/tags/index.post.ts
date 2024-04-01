import validate from "validate.js";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const error = validate(body, {
        label: {
            presence: true,
            length: {
                minimum: 1
            },
            type: "string"
        },
        colorId: {
            presence: true,
            type: "string"
        }
    })
    console.log(error)
    if (error) throw createError({
        statusCode: 400,
        statusMessage: 'The provided data was flawed.',
        data: error
    })

    const label = body.label
    const colorId = body.colorId

    try {
        await event.context.prisma.user.update({
            where: {id: event.context.userId},
            data: {
                tags: {
                    create: [{label: label, colorId: colorId}]
                }
            }
        })
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'An internal server error occurred.'
        })
    }

    return {
        statusCode: 200,
        statusMessage: 'The tag was successfully created.'
    }

})