export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const label = body.label
    const colorId = body.colorId

    await event.context.prisma.user.update({
        where: { id: event.context.userId },
        data: {
            tags: {
                create: [{ label: label, colorId: colorId }]
            }
        }
    })
})

