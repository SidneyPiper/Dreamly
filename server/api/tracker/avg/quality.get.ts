export default defineEventHandler(async (event): Promise<number> => {
    const dreamCount = await event.context.prisma.trackerData.aggregate({
        where: {userId: event.context.session!.user.id},
        _avg: {
            quality: true
        }
    })
    return dreamCount._avg.quality ?? 0
})