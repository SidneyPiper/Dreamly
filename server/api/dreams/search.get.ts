import {DreamWithTags} from "~/prisma/types";

export default defineEventHandler(async (event): Promise<DreamWithTags[]> => {
    const url = getRequestURL(event)
    const term = url.searchParams.get('s')
    const tags = url.searchParams.get('tags')?.split(":")

    let tagFilter: any = {}

    if (tags![0] != '') {
        tagFilter = {
            some: {
                id: {
                    in: tags
                }
            }
        }
    }

    const segmenter = new Intl.Segmenter([], {granularity: 'word'});
    const segmentedText = segmenter.segment(term!);
    const words = [...segmentedText].filter(s => s.isWordLike).map(s => s.segment);

    const s = words.join(" & ")

    return event.context.prisma.dream.findMany({
        where: {
            userId: event.context.session!.user.id,
            tags: tagFilter
        },
        include: {
            tags: {
                include: {
                    color: true
                }
            }
        },
        orderBy: {
            _relevance: {
                fields: ['title', 'content'],
                search: s,
                sort: 'desc'
            }
        },
        take: 10
    });
})