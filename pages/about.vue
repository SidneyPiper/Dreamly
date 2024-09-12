<template>
  <div class="flex flex-col h-full relative">
    <div class="flex items-center justify-between p-4">
      <TextButton class="flex items-center gap-2 font-semibold text-xl" @click="$router.back">
        <ChevronLeftIcon class="w-6 h-6"/>
        Back
      </TextButton>
    </div>
    <Fader class="grow text-cloud dark:text-stone-900" vertical>
      <div class="h-full overflow-y-auto text-black dark:text-white px-4 pb-4 flex flex-col gap-6">
        <LabeledText label="Welcome to Dreamly!">
          <p>Dreamly is a user-friendly app designed to help you document and explore your dreams. Whether you're
            interested in dream interpretation, pursuing lucid dreaming, or simply want to capture and reflect on your
            subconscious thoughts, keeping a dream diary offers valuable insights into your mind and emotions.</p>
        </LabeledText>
        <LabeledText label="Why Keep a Dream Diary?">
          <p>A dream diary is more than just a journal for dreams - it’s a tool for self-discovery. Here are some of the
            benefits:</p>
          <LabeledText label="Enhanced Dream Recall" small>
            <p>Regularly writing down your dreams helps you remember more details and increases dream awareness.</p>
          </LabeledText>
          <LabeledText label="Lucid Dreaming" small>
            <p>A dream diary can aid in recognizing patterns in your dreams, making it easier to identify when you are
              dreaming and eventually take control of the dream.</p>
          </LabeledText>
          <LabeledText label="Self-Reflection" small>
            <p>Dreams often reveal hidden thoughts and emotions. Recording them can lead to a deeper understanding of
              your subconscious.</p>
          </LabeledText>
          <LabeledText label="Improved Sleep Quality" small>
            <p>Being mindful of your dream habits can help track your sleep patterns and promote better rest.</p>
          </LabeledText>
        </LabeledText>
        <LabeledText label="Meet the Developers">
          <p>Dreamly was created by <span class="font-bold">Sidney Piper</span> and <span
              class="font-bold">John Wagner</span>,
            a development duo with a shared fascination for dreams. Both
            Sidney and John collaborated closely on every aspect of the app, from its design to how it works behind the
            scenes. The idea for Dreamly came about when they began sharing their own vivid and interesting dreams,
            realizing the value of having a dedicated space to record and reflect on them.</p>
          <p>Together, they believe that <span class="font-bold">the better we understand our dreams, the better we understand ourselves</span>,
            and Dreamly was built with this philosophy in mind.</p>
        </LabeledText>
      </div>
    </Fader>

  </div>
</template>

<script setup lang="ts">
import {ChevronLeftIcon} from "@heroicons/vue/24/solid";

definePageMeta({
  middleware: 'auth',
})
</script>