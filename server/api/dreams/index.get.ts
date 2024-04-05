import {DreamWithTags} from "~/prisma/types";

export default defineEventHandler(async (event): Promise<DreamWithTags[]> => {
    const url = getRequestURL(event)
    let page = Math.max(parseInt(url.searchParams.get('page') ?? '1'), 1)
    let count = Math.min(parseInt(url.searchParams.get('count') ?? '10'), 10)

    return event.context.prisma.dream.findMany({
        where: {userId: event.context.session!.user.id},
        include: {
            tags: {
                include: {
                    color: true
                }
            }
        },
        skip: (page - 1) * count,
        take: count,
        orderBy: [{date: 'desc'}]
    });
})