import { Prisma } from '@prisma/client'

const tagWithColor = Prisma.validator<Prisma.TagDefaultArgs>()({
    include: { color: true },
})

export type TagWithColor = Prisma.TagGetPayload<typeof tagWithColor>

const color = Prisma.validator<Prisma.ColorDefaultArgs>()({})

export type Color = Prisma.ColorGetPayload<typeof color>