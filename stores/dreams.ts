import {defineStore} from 'pinia'
import type {DreamWithTags, Response, TagWithColor} from "~/prisma/types";
import {useNotificationsStore} from "~/stores/notifications";

/**
 * Represents a Dream.
 *
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

export interface DreamMap {
    [key: string]: Dream
}

/**
 * A store for managing dreams.
 */
export const useDreamsStore = defineStore('dreams', () => {
    const dreamsMap = ref<DreamMap>({})

    const dreams = computed(() => {
        return Object.values(dreamsMap.value).sort((a: Dream, b: Dream) => Math.sign(b.date.getTime() - a.date.getTime()))
    })

    const {notify} = useNotificationsStore()
    const headers = useRequestHeaders(['cookie']) as HeadersInit

    /**
     * Returns a dream with the specified id.
     *
     * @param {string} id - The id of the dream to retrieve.
     * @return {Dream} - The dream object with the specified id.
     */
    async function get(id: string): Promise<Dream> {
        if (dreamsMap.value[id]) return dreamsMap.value[id]

        return $fetch<DreamWithTags>('/api/dreams/' + id, {
            method: 'GET',
            headers: headers,
        }).then((response: DreamWithTags) => {
            dreamsMap.value[response.id] = response
            dreamsMap.value[response.id].date = new Date(response.date)
            return response
        }).catch((error) => {
            console.log(error)
            notify(Level.DANGER, 'Dream not found')
            return empty()
        })
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
    async function fetch(page: number = 1, count: number = 10): Promise<boolean> {
        return $fetch<DreamWithTags[]>('/api/dreams/', {
            method: 'GET',
            headers: headers,
            params: {
                page: page,
                count: count
            }
        }).then((response: DreamWithTags[]) => {
            const mapped = response.reduce((accumulator: DreamMap, current: DreamWithTags) => {
                accumulator[current.id] = current
                accumulator[current.id].date = new Date(current.date)
                return accumulator
            }, {} as DreamMap)

            dreamsMap.value = {
                ...dreamsMap.value,
                ...mapped
            }
            return response.length == count
        }).catch((error) => {
            console.log(error)
            notify(Level.DANGER, 'Couldn\'t load dreams')
            return false
        })
    }

    /**
     * Creates a new dream. (USA roleplay 1931)
     *
     * @param {Dream} dream - The dream object containing the title, content, and tags of the dream.
     * @return {Promise<Response>} - A promise that resolves to the response of the POST request.
     */
    async function create(dream: Dream): Promise<Response<DreamWithTags>> {
        const tagIds = dream.tags.map(x => x.id)

        return $fetch<Response<DreamWithTags>>('/api/dreams', {
            method: 'POST',
            body: {
                title: dream.title,
                content: dream.content,
                tags: tagIds
            },
        }).then((response: Response<DreamWithTags>) => {
            dreamsMap.value[response.data.data!.id] = response.data.data!
            dreamsMap.value[response.data.data!.id].date = new Date(response.data.data!.date)
            notify(Level.SUCCESS, response.data.statusMessage)
            return response
        }).catch((response: Response<DreamWithTags>) => {
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
    async function update(dream: Dream): Promise<Response<DreamWithTags>> {
        if (dream.id == null || dream.id == '') return create(dream)
        const tagIds = dream.tags.map(x => x.id)

        return $fetch<Response<DreamWithTags>>('/api/dreams/' + dream.id, {
            method: 'PATCH',
            body: {
                title: dream.title,
                content: dream.content,
                tags: tagIds
            },
        }).then((response: Response<DreamWithTags>) => {
            dreamsMap.value[response.data.data!.id] = response.data.data!
            dreamsMap.value[response.data.data!.id].date = new Date(response.data.data!.date)
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
    async function destroy(dream: Dream | string): Promise<Response<null>> {
        const id: string = typeof dream === 'object' && dream !== null ? dream.id! : dream;

        return $fetch<Response<null>>('/api/dreams/' + id, {
            method: 'DELETE'
        }).then(response => {
            delete dreamsMap.value[id]
            notify(Level.SUCCESS, response.data.statusMessage)
            return response
        }).catch((response) => {
            notify(Level.DANGER, response.data.statusMessage)
            return response
        })
    }

    return {dreams, get, empty, fetch, create, update, destroy}
})