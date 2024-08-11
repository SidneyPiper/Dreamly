export default defineEventHandler(async (event): Promise<number> => {
    return event.context.prisma.dream.count({
        where: {userId: event.context.session!.user.id},
    });
})