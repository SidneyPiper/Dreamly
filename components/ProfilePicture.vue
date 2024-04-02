<template>
  <img v-if="data?.user?.image != null && data?.user?.image != ''"
       :src="data?.user?.image"
       alt="Profile picture"
       class="w-7 h-7 rounded-full border-2">
  <div v-else class="flex items-center justify-center w-8 h-8 rounded-full border-2 overflow-hidden">
    <UserIcon class="w-5 aspect-square"/>
  </div>
</template>

<script lang="ts" setup>
import {UserIcon} from "@heroicons/vue/24/solid";

const {data} = useAuth()
</script>