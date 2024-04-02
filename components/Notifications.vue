<template>
  <div class="fixed w-full max-w-xs flex gap-3 flex-col-reverse top-0 pt-2 left-1/2 -translate-x-1/2 z-50">
    <TransitionGroup name="list" @before-leave="beforeLeave">
      <Alert v-for="notification of notifications"
             :key="notification.id"
             :level="notification.level"
             :message="notification.message"
             :title="notification.title"/>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import {useNotificationsStore} from "~/stores/notifications";
import {storeToRefs} from "pinia";

const {notifications} = storeToRefs(useNotificationsStore())

const beforeLeave = (el: any) => {
  el.disabled = true

  const top = el.offsetTop;
  el.style.position = 'absolute';
  el.style.top = top + 'px';
}
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0)
}

.list-leave-active {
  position: absolute;
}
</style>
