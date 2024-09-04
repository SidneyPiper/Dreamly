import {validateEmail} from "~/shared/validation";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const email = body.email

    if (event.context.session!.user.oauth) {
        throw createError({
            statusCode: 500,
            statusMessage: 'You can\'t change your email'
        })
    }

    if (!validateEmail(email)) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Not a valid email address.'
        })
    }

    try {
        await event.context.prisma.user.update({
            where: {
                id: event.context.session!.user.id,
            },
            data: {
                email: email,
            }
        })

        return {
            data: {
                statusCode: 200,
                statusMessage: 'Changed email successfully.'
            }
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'An internal server error occurred. (Unique)'
        })
    }
})