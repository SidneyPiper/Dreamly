import {DateTime} from "luxon";
import {Day} from "~/prisma/types";

export default defineEventHandler(async (event): Promise<{ [key: string]: Day }> => {
    const url = getRequestURL(event)

    let from = DateTime.now().startOf('day').minus({month: 1})
    let to = DateTime.now().startOf('day')

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

    const tracker = await event.context.prisma.trackerData.findMany({
        where: {
            userId: event.context.session!.user.id,
            date: {
                gte: from.toJSDate(),
                lte: to.toJSDate()
            }
        },
        orderBy: [{date: 'desc'}]
    });

    const dreams = await event.context.prisma.dream.findMany({
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
        orderBy: [{date: 'desc'}]
    });

    const days: { [key: string]: Day } = {}

    tracker.forEach((trackerData) => {
        const date = DateTime.fromJSDate(trackerData.date).toISODate()

        if (date !== null)
            days[date] = {
                dreams: [],
                tracker: trackerData
            }
    })

    dreams.forEach((dream) => {
        const date = DateTime.fromJSDate(dream.date).toISODate()

        if (date !== null) {
            if (days[date] === undefined) {
                days[date] = {
                    dreams: [],
                    tracker: null
                }
            }

            days[date].dreams.push(dream)
        }
    })

    return days
})