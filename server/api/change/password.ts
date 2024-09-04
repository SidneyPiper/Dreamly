import {compare, genSalt, hash} from "bcrypt-ts";
import {validatePassword} from "~/shared/validation";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const password = body.password
    const old_password = body.old_password

    if (event.context.session!.user.oauth) {
        throw createError({
            statusCode: 500,
            statusMessage: 'You can\'t change your password'
        })
    }

    const credentials = await event.context.prisma.user.findFirst({
        where: {
            id: event.context.session!.user.id,
        },
        select: {
            password: true
        }
    })

    const valid = await compare(old_password, credentials?.password!)

    if (!valid) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Wrong password'
        })
    }

    if (!validatePassword(password)) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Password is not sufficient.'
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
                statusMessage: 'Changed password successfully.'
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