<template>
    <div class="flex flex-col h-dvh text-stone-950 bg-cloud dark:text-white dark:bg-stone-900">
        <div class="grow overflow-y-auto">
            <slot />
        </div>
        <Tabs class="shrink-0 w-full" />
    </div>
</template>