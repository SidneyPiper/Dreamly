import {type Color} from "~/prisma/types";

export default defineEventHandler(async (event): Promise<Color[]> => {
    return event.context.prisma.color.findMany();
})