import {DreamWithTags} from "~/prisma/types";

export default defineEventHandler(async (event): Promise<DreamWithTags> => {
    const id = getRouterParam(event, 'id')

    return event.context.prisma.dream.findUniqueOrThrow({
        where: {
            id: id,
            userId: event.context.session?.user.id
        },
        include: {
            tags: {
                include: {
                    color: true
                }
            }
        }
    });
})