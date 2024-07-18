import {TrackerData} from "~/prisma/types";

export default defineEventHandler(async (event): Promise<TrackerData> => {
    const id = getRouterParam(event, 'id')

    return event.context.prisma.trackerData.findUniqueOrThrow({
        where: {
            id: id,
            userId: event.context.session?.user.id
        }
    });
})