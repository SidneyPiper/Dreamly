import {genSalt, hash} from "bcrypt-ts";
import {validatePassword} from "~/shared/validation";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const name = body.name
    const email = body.email
    const password = body.password

    if (!validatePassword(password)) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Password is not sufficient.'
        })
    }

    const salt = await genSalt(10);
    const hashed_password = await hash(password, salt);

    try {
        await event.context.prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashed_password
            }
        })
        return true
    } catch (error) {
        return false
    }
})