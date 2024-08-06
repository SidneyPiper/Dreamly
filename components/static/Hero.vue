<template>
  <div class="overflow-hidden py-20 sm:pt-16 pb-32 lg:pb-32 xl:pb-38">
    <Wrapper>
      <div class="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
        <div
            class="flex flex-col gap-6 relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:py-8 xl:col-span-6">
          <h1 class="text-4xl font-medium tracking-tight">Track everything dreamly.</h1>
          <p class="text-lg">By leveraging our suite of scientific tools around dream diary, sleep
            quality and duration trackers, and efficient search functionality, you can finally be the king of your
            dreams instead of the vassal.</p>
          <div class="flex items-stretch gap-2">
            <SecondaryButton>Login</SecondaryButton>
            <PrimaryButton class="font-semibold">Register</PrimaryButton>
          </div>
        </div>
        <div
            class="col-span-5 lg:col-span-4 xl:col-start-8 lg:col-start-9 relative row-span-1 [mask-image:linear-gradient(to_bottom,white_40%,transparent)]">
          <Phone class="!absolute w-full ">
            <div class="flex flex-col text-cloud py-4 h-full w-full bg-stone-800">
              <Dream :dream="{
                  title: 'The Enchanted Forest',
                  content: 'I found myself walking through a lush, green forest filled with twinkling lights and whispering trees. As I ventured deeper, I encountered magical creatures who guided me to a hidden waterfall that glowed with a soft, ethereal light.',
                  date: new Date(),
                  tags: [{
                    label: 'Fantasy',
                    color: { hex: '#FDE4CF'}
                  },
                  {
                    label: 'Exploration',
                    color: { hex: '#FFCFD2'}
                  }]
              }"/>
              <Dream :dream="{
                  title: 'Lorem Ipsum',
                  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  date: new Date(),
                  tags: []
              }"/>
            </div>
          </Phone>
        </div>
      </div>
    </Wrapper>
  </div>
</template>

<script lang="ts" setup>
import Wrapper from "~/components/static/Wrapper.vue";
import Phone from "~/components/static/Phone.vue";
</script>