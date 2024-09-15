import type {RouterConfig} from "@nuxt/schema";

export default <RouterConfig>{
    scrollBehavior(to, from, savedPosition) {
        const scroll = getPageScrollPositions(to.fullPath)
        if (to.fullPath === from.fullPath) {
            window.scrollTo({top: 0, left: 0, behavior: "smooth"})
            document.querySelectorAll(`[data-scrollable]`).forEach(e => e.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            }))
        } else {
            if (to.meta.preserveScroll) {
                window.scrollTo(0, scroll.window)
                for (const id in scroll.containers) {
                    document.querySelector(`[data-scrollable="${id}"]`)?.scrollTo(0, scroll.containers[id])
                }
            } else {
                console.log("Not preserving scroll. Up to the top")
                window.scrollTo(0, 0)
                document.querySelectorAll(`[data-scrollable]`).forEach(e => e.scrollTo(0, 0))
            }
        }
    }
}