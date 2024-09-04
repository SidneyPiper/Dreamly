export default defineEventHandler(async event => {
    return event.context.prisma.user.findFirst({
        where: {
            id: event.context.session!.user.id,
        },
        select: {
            name: true,
            email: true,
            dreams: {
                select: {
                    title: true,
                    content: true,
                    date: true,
                    tags: {
                        select: {
                            label: true
                        }
                    }
                }
            },
            tags: {
                select: {
                    label: true
                }
            },
            trackerData: {
                select: {
                    date: true,
                    quality: true,
                    duration: true
                }
            }
        },
    })
})