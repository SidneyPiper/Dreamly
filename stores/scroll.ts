interface PageScroll {
    window: number,
    containers: { [key: string]: number },
}

const scrollPositions = new Map<string, PageScroll>()

const setPageScrollPositions = (page: string, scroll: PageScroll) => {
    scrollPositions.set(page, scroll)
}

const getPageScrollPositions = (page: string): PageScroll => {
    const position = scrollPositions.get(page)
    if (position) {
        return position
    }
    return {window: 0, containers: {}}
}

export {setPageScrollPositions, getPageScrollPositions}