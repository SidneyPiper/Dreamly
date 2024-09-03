import {genSalt, hash} from "bcrypt-ts";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const password = body.password

    const credentials = await event.context.prisma.user.findFirst({
        where: {
            id: event.context.session!.user.id,
        },
        select: {
            password: true
        }
    })

    if (!credentials?.password) {
        throw createError({
            statusCode: 500,
            statusMessage: 'You can\'t change your password'
        })
    }

    const salt = await genSalt(10);
    const hashed_password = await hash(password, salt);

    try {

        await event.context.prisma.user.update({
            where: {
                id: event.context.session!.user.id,
            },
            data: {
                password: hashed_password
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