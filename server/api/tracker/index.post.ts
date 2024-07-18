import validate from '../../helper/validator';
import {DateTime} from "luxon";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const error = validate(body, {
        date: {
            datetime: true
        },
        quality: {
            numericality: {
                onlyInteger: true,
                greaterThanOrEqualTo: 1,
                lessThanOrEqualTo: 5
            },
            type: "integer"
        },
        duration: {
            numericality: {
                onlyInteger: true,
                greaterThanOrEqualTo: 0,
                lessThanOrEqualTo: 48 * 60
            },
            type: "integer"
        }
    })

    if (error) throw createError({
        statusCode: 400,
        statusMessage: 'The provided data was invalid.',
        data: error
    })

    const date = DateTime.fromISO(body.date)

    if (!date.isValid) throw createError({
        statusCode: 400,
        statusMessage: 'The date was invalid.',
        data: {}
    })

    const quality = body.quality ?? null
    const duration = body.duration ?? null

    try {
        const trackerData = await event.context.prisma.trackerData.create({
            data: {
                userId: event.context.session!.user.id,
                date: date.startOf('day').toJSDate(),
                quality: quality,
                duration: duration
            }
        })

        return {
            data: {
                statusCode: 200,
                statusMessage: 'The tracker data was saved!',
                data: trackerData
            }
        }
    } catch (error) {
        console.log(error);
        throw createError({
            statusCode: 500,
            statusMessage: 'An internal server error occurred.'
        })
    }
})