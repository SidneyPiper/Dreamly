export default defineEventHandler(async (event) => {
    return await event.context.prisma.tag.findMany({
        where: { userId: event.context.userId },
        include: {
            color: true
        }
    })
})