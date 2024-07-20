import {DateTime} from "luxon";
import {Day} from "~/prisma/types";

export default defineEventHandler(async (event): Promise<Day> => {
    const dateParam = getRouterParam(event, 'date')

    if (dateParam === null || dateParam === undefined) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid date parameter.',
        })
    }

    const date = DateTime.fromISO(dateParam)

    if (!date.isValid) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid date parameter.',
        })
    }

    const tracker = await event.context.prisma.trackerData.findFirst({
        where: {
            userId: event.context.session!.user.id,
            date: {
                gte: date.startOf('day').toJSDate(),
                lte: date.endOf('day').toJSDate()
            }
        },
        orderBy: [{date: 'desc'}]
    });

    const dreams = await event.context.prisma.dream.findMany({
        where: {
            userId: event.context.session!.user.id,
            date: {
                gte: date.startOf('day').toJSDate(),
                lte: date.endOf('day').toJSDate()
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

    return {tracker, dreams}
})