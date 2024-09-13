import type {LayoutKey} from "#build/types/layouts";

type ViewportSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

/**
 * This composable is used to dynamically change the layout of the page based on the viewport size.
 */
export default function (defaultLayout: LayoutKey, otherLayouts: Partial<Record<ViewportSize, LayoutKey>>) {
    const viewport = useViewport()

    function updateLayout() {
        let newLayout: LayoutKey = defaultLayout
        for (const [breakpoint, layout] of Object.entries(otherLayouts)) {
            if (viewport.isGreaterOrEquals(breakpoint)) newLayout = layout
        }

        setPageLayout(newLayout)
    }

    onMounted(() => {
        updateLayout()
        watch(viewport.breakpoint, updateLayout)
    })
}