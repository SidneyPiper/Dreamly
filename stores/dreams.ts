import {defineStore} from 'pinia'
import type {DreamWithTags, Response, TagWithColor} from "~/prisma/types";
import {useNotificationsStore} from "~/stores/notifications";

/**
 * Represents a Dream.
 * @interface
 * @property {string | null} id - The unique identifier of the dream.
 * @property {string} title - The title of the dream.
 * @property {string} content - The content of the dream.
 * @property {Date} date - The date when the dream occurred.
 * @property {TagWithColor[]} tags - The tags associated with the dream.
 */
export interface Dream {
    id: string | null,
    title: string,
    content: string,
    date: Date,
    tags: TagWithColor[]
}

/**
 * A store for managing dreams.
 */
export const useDreamsStore = defineStore('dreams', () => {
    const dreams = ref<Dream[]>([])
    const dirty = ref<boolean>(true)

    const {notify} = useNotificationsStore()
    const headers = useRequestHeaders(['cookie']) as HeadersInit

    /**
     * Returns a dream with the specified id.
     *
     * @param {string} id - The id of the dream to retrieve.
     * @return {Dream} - The dream object with the specified id.
     */
    async function get(id: string): Promise<Dream> {
        await fetch()

        for (const dream of dreams.value) {
            if (dream.id === id) return dream;
        }

        notify(Level.DANGER, 'Dream not found')
        return empty()
    }

    /**
     * Creates a new Dream object with the provided initial values.
     *
     * @param {Partial<Dream>?} initial - The initial values to set for the Dream object.
     * @returns {Dream} - A new Dream object with the provided initial values.
     */
    function empty(initial?: Partial<Dream>): Dream {
        return {
            id: initial?.id || null,
            title: initial?.title || '',
            content: initial?.content || '',
            date: initial?.date || new Date(),
            tags: initial?.tags || []
        }
    }

    /**
     * Fetches dreams from the server.
     *
     * @returns {Promise<void>} - A promise that resolves with the fetched dreams.
     */
    async function fetch(): Promise<void> {
        if (!dirty.value) return

        await $fetch<DreamWithTags[]>('/api/dreams/', {
            method: 'GET',
            headers: headers
        }).then((response: DreamWithTags[]) => {
            dreams.value = response.map((dream: DreamWithTags): Dream => {
                return {
                    id: dream.id,
                    title: dream.title,
                    content: dream.content,
                    date: dream.date,
                    tags: dream.tags
                }
            })
            dirty.value = false;
        }).catch((error) => {
            console.log(error)
            notify(Level.DANGER, 'Couldn\'t load dreams')
        })
    }

    /**
     * Creates a new dream. (USA roleplay 1931)
     *
     * @param {Dream} dream - The dream object containing the title, content, and tags of the dream.
     * @return {Promise<Response>} - A promise that resolves to the response of the POST request.
     */
    async function create(dream: Dream): Promise<Response> {
        const tagIds = dream.tags.map(x => x.id)

        return $fetch<Response>('/api/dreams', {
            method: 'POST',
            body: {
                title: dream.title,
                content: dream.content,
                tags: tagIds
            },
        }).then((response: Response) => {
            dirty.value = true;
            fetch()
            notify(Level.SUCCESS, response.data.statusMessage)
            return response
        }).catch((response: Response) => {
            notify(Level.DANGER, response.data.statusMessage)
            return response
        })
    }

    /**
     * Updates the dream with the provided data.
     * Forwards to create(dream) if the dream doesn't exist
     *
     * @param {Dream} dream - The dream object to be updated.
     * @return {Promise<Response>} - A promise that resolves with the response returned from the server.
     */
    async function update(dream: Dream): Promise<Response> {
        if (dream.id == null || dream.id == '') return create(dream)
        const tagIds = dream.tags.map(x => x.id)

        return $fetch<Response>('/api/dreams/' + dream.id, {
            method: 'PATCH',
            body: {
                title: dream.title,
                content: dream.content,
                tags: tagIds
            },
        }).then((response) => {
            dirty.value = true;
            fetch()
            notify(Level.SUCCESS, response.data.statusMessage)
            return response
        }).catch((response) => {
            notify(Level.DANGER, response.data.statusMessage)
            return response
        })
    }


    /**
     * Destroys a dream. (*cries in zeros and ones*)
     *
     * @param {Dream|string} dream - The dream to destroy. Can be either a Dream object or a string representing the dream's ID.
     * @return {Promise<Response>} - A promise that resolves to the response from the server.
     */
    async function destroy(dream: Dream | string): Promise<Response> {
        const id = typeof dream === 'object' && dream !== null ? dream.id : dream;

        return $fetch<Response>('/api/dreams/' + id, {
            method: 'DELETE'
        }).then(response => {
            dirty.value = true;
            fetch()
            notify(Level.SUCCESS, response.data.statusMessage)
            return response
        }).catch((response) => {
            notify(Level.DANGER, response.data.statusMessage)
            return response
        })
    }

    return {dreams, dirty, get, empty, fetch, create, update, destroy}
})