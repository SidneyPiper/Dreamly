<template>
  <Transition name="expand">
    <div v-if="open">
      <div>
        <div class="flex flex-wrap gap-2 py-2">
          <button v-for="tag in tagsStore.tags" :key="tag.id" @click="update(tag.id)">
            <Tag :hex="tag.color.hex"
                 :style="filteredTags?.includes(tag.id) && 'boxShadow : 0px 0px 8px 1px' + tag.color.hex"
                 class="shadow-inner">
              {{ tag.label }}
            </Tag>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {useTagsStore} from "stores/tags";
import {useSearchStore} from "stores/search";

const filteredTags = defineModel<string[]>()

const emit = defineEmits<{
  (e: 'update'): void
}>()

const open = defineModel<boolean>("open")

const tagsStore = useTagsStore()

onBeforeMount(async () => {
  await tagsStore.fetch()
})

const update = (id: string) => {
  if (filteredTags.value!.includes(id)) {
    filteredTags.value!.splice(filteredTags.value!.indexOf(id), 1)
  } else {
    filteredTags.value!.push(id)
  }
  emit('update')
}

const toggle = () => open.value = !open.value

defineExpose({toggle})
</script>