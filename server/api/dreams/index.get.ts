import {DreamWithTags} from "~/prisma/types";
import {DateTime} from "luxon";

export default defineEventHandler(async (event): Promise<DreamWithTags[]> => {
    const url = getRequestURL(event)
    let page = Math.max(parseInt(url.searchParams.get('page') ?? '1'), 1)
    let count = Math.min(parseInt(url.searchParams.get('count') ?? '10'), 10)

    let to = DateTime.now().startOf('day')
    let from = to.minus({year: 100})

    if (url.searchParams.has('from')) {
        const customFrom = DateTime.fromISO(url.searchParams.get('from')!)
        if (!customFrom.isValid) throw new Error('Invalid from date')

        from = customFrom
    }

    if (url.searchParams.has('to')) {
        const customTo = DateTime.fromISO(url.searchParams.get('to')!)
        if (!customTo.isValid) throw new Error('Invalid to date')

        to = customTo
    }

    if (from > to) [from, to] = [to, from]

    return event.context.prisma.dream.findMany({
        where: {
            userId: event.context.session!.user.id,
            date: {
                gte: from.toJSDate(),
                lte: to.toJSDate()
            }
        },
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