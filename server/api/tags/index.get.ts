import {type TagWithColor} from "~/prisma/types";

export default defineEventHandler(async (event): Promise<TagWithColor[]> => {
    return event.context.prisma.tag.findMany({
        where: {userId: event.context.userId},
        include: {
            color: true
        }
    });
})