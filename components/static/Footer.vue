<template>
  <div class="flex flex-col items-center justify-center w-full px-4 py-16">
    <p class="text-lg font-semibold ">&copy; {{ DateTime.now().year }} Sidney Piper / John Wagner</p>
    <div class="flex items-center justify-center gap-4">
      <TextButton class="hover:underline" to="/imprint">Imprint & Privacy</TextButton>
      <p>&middot;</p>
      <TextButton class="hover:underline" to="https://github.com/SidneyPiper/Dreamly">Github</TextButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {DateTime} from "luxon";
</script>