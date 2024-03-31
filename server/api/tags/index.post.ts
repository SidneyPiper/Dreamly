export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const label = body.label
    const colorId = body.colorId

    console.log(event.context.token?.sub);

    try {
        await event.context.prisma.user.update({
            where: { id: event.context.token?.sub },
            data: {
                tags: {
                    create: [{ label: label, colorId: colorId }]
                }
            }
        })
    } catch (error) {
        return error
    }
    return 'success'
})

