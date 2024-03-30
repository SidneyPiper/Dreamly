<template>
  <div class="flex flex-col h-full gap-4 px-4 pt-4 text-cloud">
    <h1 class="text-2xl font-semibold">Profile</h1>

    <DataWithIcon :value="data.user.name">
      <UserIcon class="w-5 h-5"/>
    </DataWithIcon>
    <DataWithIcon :value="data.user.email">
      <EnvelopeIcon class="w-5 h-5"/>
    </DataWithIcon>
    <DataWithIcon :value="data.user.image">
      <PhotoIcon class="w-5 h-5"/>
    </DataWithIcon>

    <SecondaryButton class="justify-center py-2" @click="signOut({ callbackUrl: '/login' })">
      Logout
    </SecondaryButton>

    <div class="flex flex-col justify-end grow">
      <div class="flex items-center justify-between mb-3">
        <p class="font-semibold">Statistics for nerds</p>
        <button @click="nerdStats = !nerdStats">
          <ChevronDownIcon :class="{'rotate-180': !nerdStats}" class="w-5 h-5 transition-transform"/>
        </button>
      </div>

      <Transition name="expand">
        <div v-show="nerdStats">
          <div class="flex flex-col gap-4 ">
            <DataWithIcon :value="token.sub">
              <p class="font-mono uppercase font-black text-sm">sub</p>
            </DataWithIcon>

            <DataWithIcon :value="token.iat">
              <p class="font-mono uppercase font-black text-sm">iat</p>
            </DataWithIcon>

            <DataWithIcon :value="token.exp">
              <p class="font-mono uppercase font-black text-sm">exp</p>
            </DataWithIcon>

            <DataWithIcon :value="token.jti" class="mb-4">
              <p class="font-mono uppercase font-black text-sm">jti</p>
            </DataWithIcon>
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