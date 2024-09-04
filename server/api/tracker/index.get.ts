import {DateTime} from "luxon";
import {TrackerData} from "~/prisma/types";

export default defineEventHandler(async (event): Promise<TrackerData[]> => {
    const url = getRequestURL(event)

    let from: DateTime = DateTime.now().startOf('day').minus({month: 1})
    let to: DateTime = DateTime.now().startOf('day')

    if (url.searchParams.has('from')) {
        const customFrom = DateTime.fromISO(url.searchParams.get('from')!)
        if (!customFrom.isValid) throw createError({
            statusCode: 400,
            statusMessage: 'The from date was invalid.',
        })

        from = customFrom
    }

    if (url.searchParams.has('to')) {
        const customTo = DateTime.fromISO(url.searchParams.get('to')!)
        if (!customTo.isValid) throw createError({
            statusCode: 400,
            statusMessage: 'The to date was invalid.',
        })

        to = customTo
    }


    // hier kracht es undendlicher error
    if (from > to) [from, to] = [to, from]

    return event.context.prisma.trackerData.findMany({
        where: {
            userId: event.context.session!.user.id,
            date: {
                gte: from.toJSDate(),
                lte: to.toJSDate()
            }
        },
        orderBy: [{date: 'desc'}]
    });
})