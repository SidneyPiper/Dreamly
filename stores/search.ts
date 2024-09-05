import {defineStore} from 'pinia'
import type {DreamWithTags, TagWithColor} from "types";
import {useNotificationsStore} from "stores/notifications";

export const useSearchStore = defineStore('search', () => {
    const term = ref<string>("")
    const results = ref<DreamWithTags[]>([])
    const tags = ref<string[]>([])
    const filterOpen = ref<boolean>(false)

    const {notify} = useNotificationsStore()
    const headers = useRequestHeaders(['cookie']) as HeadersInit


    async function search(): Promise<DreamWithTags[]> {
        const tags_string = tags.value.join(":")

        return $fetch<DreamWithTags[]>('/api/dreams/search', {
            method: 'GET',
            headers: headers,
            params: {
                s: term,
                tags: tags_string
            }
        }).then((response: DreamWithTags[]) => {
            results.value = response
            return response
        }).catch((error) => {
            console.log(error)
            notify(Level.DANGER, 'Couldn\'t load dreams')
            return error
        })
    }

    return {search, term, tags, results, filterOpen}
})