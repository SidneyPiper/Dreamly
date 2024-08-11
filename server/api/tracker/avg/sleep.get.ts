export default defineEventHandler(async (event): Promise<number> => {
    const dreamCount = await event.context.prisma.trackerData.aggregate({
        where: {userId: event.context.session!.user.id},
        _avg: {
            duration: true
        }
    })
    return dreamCount._avg.duration ?? 0
})