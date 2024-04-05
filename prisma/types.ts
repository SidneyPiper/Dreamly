import {Prisma} from '@prisma/client'

/**
 * Represents a response from an API call.
 * @interface Response
 */
export interface Response<T> {
    data: {
        status: number,
        statusMessage: string,
        data?: T
    }
}

/** TagWithColor **/
const tagWithColor = Prisma.validator<Prisma.TagDefaultArgs>()({
    select: {
        id: true,
        label: true,
        color: true
    }
})
export type TagWithColor = Prisma.TagGetPayload<typeof tagWithColor>

/** Color **/
const color = Prisma.validator<Prisma.ColorDefaultArgs>()({})
export type Color = Prisma.ColorGetPayload<typeof color>

/** DreamWithTags **/
const dreamWithTags = Prisma.validator<Prisma.DreamDefaultArgs>()({
    select: {
        id: true,
        title: true,
        content: true,
        date: true,
        tags: {
            include: {
                color: true
            }
        }
    },
})

export type DreamWithTags = Prisma.DreamGetPayload<typeof dreamWithTags>