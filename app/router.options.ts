import type {RouterConfig} from "@nuxt/schema";

export default <RouterConfig>{
    scrollBehavior(to, from, savedPosition) {
        if (to.meta.preserveScroll) {
            const scroll = getPageScrollPositions(to.fullPath)
            window.scrollTo(0, scroll.window)
            for (const id in scroll.containers) {
                console.log("setting", id, scroll.containers[id])
                document.querySelector(`[data-scrollable="${id}"]`)?.scrollTo(0, scroll.containers[id])
            }
        }
    }
}