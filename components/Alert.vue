<template>
  <div :class="{
    'text-blue-800 border-blue-300 bg-blue-50 dark:text-blue-400 dark:border-blue-800': props.level == 'info',
    'text-yellow-800 border-yellow-300 bg-yellow-50 dark:text-yellow-400 dark:border-yellow-800': props.level == 'warning',
    'text-red-800 border-red-300 bg-red-50 dark:text-red-400 dark:border-red-800': props.level == 'danger',
    'text-green-800 border-green-300 bg-green-50 dark:text-green-400 dark:border-green-800': props.level == 'success'
  }"
       class="w-full shrink-0 top-0 flex items-center p-4 text-sm border rounded-lg dark:bg-gray-800"
       role="alert">
    <InformationCircleIcon v-if="props.level == 'info'" aria-hidden="true" class="flex-shrink-0 inline w-4 h-4 me-3"/>
    <ExclamationCircleIcon v-if="props.level == 'warning'" aria-hidden="true"
                           class="flex-shrink-0 inline w-4 h-4 me-3"/>
    <XCircleIcon v-if="props.level == 'danger'" aria-hidden="true" class="flex-shrink-0 inline w-4 h-4 me-3"/>
    <CheckCircleIcon v-if="props.level == 'success'" aria-hidden="true"
                     class="flex-shrink-0 inline w-4 h-4 me-3"/>
    <span class="sr-only">{{ props.level }} alert</span>
    <div class="shrink-0">
      <span v-if="props.title" class="font-medium">{{ props.title }}</span>
      <span v-if="props.message">{{ props.message }}</span>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon} from '@heroicons/vue/20/solid';

const props = defineProps<{
  level: "info" | "danger" | "warning" | "success",
  title?: string,
  message?: string
}>()
</script>