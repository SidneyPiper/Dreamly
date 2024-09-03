import {genSalt, hash} from "bcrypt-ts";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const name = body.name
    const email = body.email
    const password = body.password

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