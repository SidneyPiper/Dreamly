<template>
  <div class="flex flex-col h-full gap-4 px-4 pt-4 text-cloud">
    <h1 class="text-2xl font-semibold">Profile</h1>

    <div class="flex items-stretch bg-stone-800 rounded-md">
      <div class="flex items-center px-3 shrink-0">
        <UserIcon class="w-5 h-5"/>
      </div>

      <input
          :value="data.user.name"
          class="grow px-0 block w-full bg-transparent border-transparent"
          disabled
          type="text">
    </div>

    <div class="flex items-stretch bg-stone-800 rounded-md">
      <div class="flex items-center px-3 shrink-0">
        <EnvelopeIcon class="w-5 h-5"/>
      </div>

      <input
          :value="data.user.email"
          class="grow px-0 block w-full bg-transparent border-transparent"
          disabled
          type="text">
    </div>

    <div class="flex items-stretch bg-stone-800 rounded-md">
      <div class="flex items-center px-3 shrink-0">
        <PhotoIcon class="w-5 h-5"/>
      </div>

      <input
          :value="data.user.image"
          class="grow px-0 block w-full bg-transparent border-transparent"
          disabled
          type="text">
    </div>

    <SecondaryButton class="justify-center py-2" @click="signOut({ callbackUrl: '/login' })">Logout</SecondaryButton>

    <div class="flex flex-col justify-end grow">
      <div class="flex items-center justify-between pb-4">
        <p class="font-semibold">Statistics for nerds</p>
        <button @click="nerdStats = !nerdStats">
          <ChevronDownIcon :class="{'rotate-180': !nerdStats}" class="w-5 h-5 transition-transform"/>
        </button>
      </div>
      <Transition>
        <div v-show="nerdStats" class="flex flex-col gap-4 pb-4">
          <div class="flex items-stretch bg-stone-800 rounded-md">
            <div class="flex items-center px-3 shrink-0">
              <p class="font-mono uppercase font-black text-sm">sub</p>
            </div>

            <input
                :value="token.sub"
                class="grow px-0 block w-full bg-transparent border-transparent"
                disabled
                type="text">
          </div>

          <div class="flex items-stretch bg-stone-800 rounded-md">
            <div class="flex items-center px-3 shrink-0">
              <p class="font-mono uppercase font-black text-sm">iat</p>
            </div>

            <input
                :value="token.iat"
                class="grow px-0 block w-full bg-transparent border-transparent"
                disabled
                type="text">
          </div>

          <div class="flex items-stretch bg-stone-800 rounded-md">
            <div class="flex items-center px-3 shrink-0">
              <p class="font-mono uppercase font-black text-sm">exp</p>
            </div>

            <input
                :value="token.exp"
                class="grow px-0 block w-full bg-transparent border-transparent"
                disabled
                type="text">
          </div>

          <div class="flex items-stretch bg-stone-800 rounded-md">
            <div class="flex items-center px-3 shrink-0">
              <p class="font-mono uppercase font-black text-sm">jti</p>
            </div>

            <input
                :value="token.jti"
                class="grow px-0 block w-full bg-transparent border-transparent"
                disabled
                type="text">
          </div>
        </div>
      </Transition>
    </div>

  </div>


</template>

<script lang="ts" setup>
import {ChevronDownIcon, EnvelopeIcon, PhotoIcon, UserIcon} from "@heroicons/vue/24/solid";

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const nerdStats = ref(false)

const {signOut} = useAuth()
const {data} = await useFetch('/api/me')

const headers = useRequestHeaders(['cookie'])
const {data: token} = await useFetch('/api/token', {headers})
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-out;
}

.v-enter-to,
.v-leave-from {
  max-height: 300px;
}

.v-enter-from,
.v-leave-to {
  max-height: 0;
  padding-bottom: 0;
  opacity: 0;
}
</style>