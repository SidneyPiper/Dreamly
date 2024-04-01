import { DreamWithTags } from "~/prisma/types";

export default defineEventHandler(async (event): Promise<DreamWithTags[]> => {
    return event.context.prisma.dream.findMany({
        where: { userId: event.context.userId },
        include: {
            tags: {
                include: {
                    color: true
                }
            }
        }
    });
})