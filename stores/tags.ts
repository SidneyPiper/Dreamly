import {defineStore} from 'pinia'
import type {Response, TagWithColor} from "~/prisma/types";
import {useNotifications} from "~/composables/Notifications";

/**
 * Defines a store for managing tags.
 */
export const useTagsStore = defineStore('tags', () => {
    const tags = ref<TagWithColor[]>([])
    const dirty = ref<boolean>(true)

    const {notify} = useNotifications()

    /**
     * Retrieves a tag by its ID.
     *
     * @param {string} id - The ID of the tag to retrieve.
     * @returns {Promise<TagWithColor>} - A Promise that resolves to the tag with the specified ID, or rejects with an error message if the tag is not found.
     */
    async function get(id: string): Promise<TagWithColor> {
        await fetch()

        for (const tag of tags.value) {
            if (tag.id === id) return tag;
        }

        notify(Level.DANGER, 'Tag not found')
        return empty()
    }

    /**
     * Creates a new instance of the `TagWithColor` object with empty values or with the initial values provided.
     *
     * @param {Partial<TagWithColor>} [initial] - Optional initial values for the `TagWithColor` object.
     * @returns {TagWithColor} A new instance of the `TagWithColor` object with empty values or with the initial values provided.
     */
    function empty(initial?: Partial<TagWithColor>): TagWithColor {
        return {
            id: '',
            label: '',
            color: {
                id: '',
                hex: '#333333'
            }
        };
    }

    /**
     * Fetches tags from the server and updates the local state with the received data.
     *
     * @return {Promise<void>} A Promise that resolves when the fetch operation is complete.
     */
    async function fetch(): Promise<void> {
        if (!dirty.value) return

        $fetch<TagWithColor[]>('/api/tags/', {
            method: 'GET'
        }).then((response: TagWithColor[]) => {
            tags.value = response.map((tags: TagWithColor): TagWithColor => {
                return {
                    id: tags.id,
                    label: tags.label,
                    color: {
                        id: tags.color.id,
                        hex: tags.color.hex
                    }
                };
            })
            dirty.value = false;
        }).catch(() => {
            notify(Level.DANGER, 'Couldn\'t load tags')
        })
    }

    /**
     * Creates a new tag with a specified color.
     *
     * @param {TagWithColor} tag - The tag object that contains the color information.
     * @return {Promise<Response>} A promise that resolves with the response from the API call.
     */
    async function create(tag: TagWithColor): Promise<Response> {
        return $fetch<Response>('/api/tags', {
            method: 'POST',
            body: tag
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
     * Updates an existing tag with the provided data.
     *
     * @param {TagWithColor} tag - The tag object to be updated.
     * @returns {Promise<Response>} - A Promise that resolves to the response from the server.
     */
    async function update(tag: TagWithColor): Promise<Response> {
        if (tag.id == null || tag.id == '') return create(tag)

        return $fetch<Response>('/api/tags/' + tag.id, {
            method: 'PATCH',
            body: tag,
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
     * Deletes a tag from the server.
     *
     * @param {TagWithColor | string} tag - The tag to be deleted. Can be either a TagWithColor object or a string representing the tag ID.
     * @returns {Promise<Response>} - A promise that resolves to the server response.
     */
    async function destroy(tag: TagWithColor | string): Promise<Response> {
        const id = typeof tag === 'object' && tag !== null ? tag.id : tag;

        return $fetch<Response>('/api/tags/' + id, {
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

    return {tags, get, empty, fetch, create, update, destroy}
})