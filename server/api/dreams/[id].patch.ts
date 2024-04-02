import validate from "validate.js";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const id = getRouterParam(event, 'id')

    const error = validate(body, {
        title: {
            length: {
                minimum: 1
            },
            type: "string"
        },
        content: {
            length: {
                minimum: 1
            },
            type: "string"
        },
        tags: {
            type: "array"
        }
    })

    if (error) throw createError({
        statusCode: 400,
        statusMessage: 'The provided data was flawed.',
        data: error
    })

    const title = body.title
    const content = body.content
    const tags = body.tags.map((x: string) => {
        return {id: x}
    })

    try {
        await event.context.prisma.user.update({
            where: {id: event.context.userId},
            data: {
                dreams: {
                    update: {
                        where: {
                            id: id
                        },
                        data: {
                            title: title,
                            content: content,
                            tags: {
                                connect: tags
                            }
                        }
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
            statusMessage: 'The dream was successfully edited.'
        }
    }

})