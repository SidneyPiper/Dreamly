<template>
    <div class="flex flex-col h-dvh font-sans text-stone-950 bg-cloud dark:text-white dark:bg-stone-900">
        <div class="grow overflow-y-auto">
            <slot />
        </div>
        <Tabs class="shrink-0 w-full" />
    </div>
</template>

<script setup>
definePageMeta({
    layoutTransition: { name: 'stay' }
})
</script>

<style>
.stay-enter-active,
.stay-leave-active {
    transition: all 0.2s;
}

.stay-enter-from,
.stay-leave-to {
    filter: grayscale(0);
}
</style>