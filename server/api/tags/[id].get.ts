import {TagWithColor} from "~/prisma/types";

export default defineEventHandler(async (event): Promise<TagWithColor> => {
    const id = getRouterParam(event, 'id')

    return event.context.prisma.tag.findUniqueOrThrow({
        where: {
            id: id
        },
        include: {
            color: true
        }
    });
})