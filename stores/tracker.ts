import {defineStore} from 'pinia'
import type {Response, TrackerData} from "~/prisma/types";
import {useNotificationsStore} from "~/stores/notifications";
import {DateTime} from "luxon";

/** Cached Trackers **/
export interface TrackerMap {
    [key: string]: TrackerData
}

/**
 * A store for managing tracker.
 */
export const useTrackerStore = defineStore('tracker', () => {
    const trackerMap = ref<TrackerMap>({})

    const tracker = computed(() => {
        return Object.values(trackerMap.value).sort((a: TrackerData, b: TrackerData) =>
            Math.sign(b.date.getTime() - a.date.getTime()))
    })

    const {notify} = useNotificationsStore()
    const headers = useRequestHeaders(['cookie']) as HeadersInit

    /**
     * Returns a tracker with the specified id.
     *
     * @param {string} id - The id of the tracker to retrieve.
     * @return {TrackerData} - The tracker object with the specified id.
     */
    async function get(id: string): Promise<TrackerData | void> {
        if (trackerMap.value[id]) return trackerMap.value[id]

        return $fetch<TrackerData>('/api/tracker/' + id, {
            method: 'GET',
            headers: headers,
        }).then((response: TrackerData) => {
            trackerMap.value[response.id] = response
            trackerMap.value[response.id].date = new Date(response.date)
            return response
        }).catch((error) => {
            console.log(error)
            notify(Level.DANGER, 'Tracker not found')
        })
    }

    /**
     * Returns the tracker from today or null if it doesn't exist.
     *
     * @return {TrackerData | null} - The tracker object with the specified id.
     */
    async function today(): Promise<TrackerData | null> {
        for (const id in trackerMap.value) {
            if (trackerMap.value[id].date.toDateString() == new Date().toDateString()) {
                return trackerMap.value[id]
            }
        }
        console.log(DateTime.now().startOf('day').toISODate())
        return $fetch<TrackerData[]>('/api/tracker/', {
            method: 'GET',
            headers: headers,
            params: {
                from: DateTime.now().startOf('day').toISODate(),
                to: DateTime.now().endOf('day').toISODate()
            }
        }).then((response: TrackerData[]) => {
            console.log()
            if (response.length == 0) return null

            trackerMap.value[response[0].id] = response[0]
            trackerMap.value[response[0].id].date = new Date(response[0].date)
            return response[0]
        }).catch((error) => {
            console.log(error)
            notify(Level.DANGER, 'No Tracker found for today')
            return null
        })
    }

    /**
     * Creates a new Tracker object with the provided initial values.
     *
     * @param {Partial<TrackerData>?} initial - The initial values to set for the Tracker object.
     * @returns {TrackerData} - A new Tracker object with the provided initial values.
     */
    function empty(initial?: Partial<TrackerData>): Partial<TrackerData> {
        return {
            id: initial?.id,
            date: initial?.date || new Date(),
            quality: initial?.quality || null,
            duration: initial?.duration || null
        }
    }

    /**
     * Fetches tracker from the server.
     *
     * @returns {Promise<void>} - A promise that resolves with the fetched tracker.
     */
    async function fetch(page: number = 1, count: number = 10): Promise<boolean> {
        return $fetch<TrackerData[]>('/api/tracker/', {
            method: 'GET',
            headers: headers,
            params: {
                page: page,
                count: count
            }
        }).then((response: TrackerData[]) => {
            const mapped = response.reduce((accumulator: TrackerMap, current: TrackerData) => {
                accumulator[current.id] = current
                accumulator[current.id].date = new Date(current.date)
                return accumulator
            }, {} as TrackerMap)

            trackerMap.value = {
                ...trackerMap.value,
                ...mapped
            }
            return response.length == count
        }).catch((error) => {
            console.log(error)
            notify(Level.DANGER, 'Couldn\'t load tracker')
            return false
        })
    }

    /**
     * Creates a new tracker.
     *
     * @param {TrackerData} tracker - The tracker object containing the title, content, and tags of the tracker.
     * @return {Promise<Response>} - A promise that resolves to the response of the POST request.
     */
    async function create(tracker: Partial<TrackerData>): Promise<Response<TrackerData>> {
        return $fetch<Response<TrackerData>>('/api/tracker', {
            method: 'POST',
            body: tracker,
        }).then((response: Response<TrackerData>) => {
            trackerMap.value[response.data.data!.id] = response.data.data!
            trackerMap.value[response.data.data!.id].date = new Date(response.data.data!.date)
            notify(Level.SUCCESS, response.data.statusMessage)
            return response
        }).catch((response: Response<TrackerData>) => {
            notify(Level.DANGER, response.data.statusMessage)
            return response
        })
    }

    /**
     * Updates the tracker with the provided data.
     * Forwards to create(tracker) if the tracker doesn't exist
     *
     * @param {TrackerData} tracker - The tracker object to be updated.
     * @return {Promise<Response>} - A promise that resolves with the response returned from the server.
     */
    async function update(tracker: Partial<TrackerData>): Promise<Response<TrackerData>> {
        if (tracker.id == null || tracker.id == '') return create(tracker)

        return $fetch<Response<TrackerData>>('/api/tracker/' + tracker.id, {
            method: 'PATCH',
            body: tracker,
        }).then((response: Response<TrackerData>) => {
            trackerMap.value[response.data.data!.id] = response.data.data!
            trackerMap.value[response.data.data!.id].date = new Date(response.data.data!.date)
            notify(Level.SUCCESS, response.data.statusMessage)
            return response
        }).catch((response) => {
            notify(Level.DANGER, response.data.statusMessage)
            return response
        })
    }

    /**
     * Destroys a tracker.
     *
     * @param {TrackerData|string} tracker - The tracker to destroy. Can be either a Tracker object or a string representing the tracker's ID.
     * @return {Promise<Response>} - A promise that resolves to the response from the server.
     */
    async function destroy(tracker: TrackerData | string): Promise<Response<null>> {
        const id: string = typeof tracker === 'object' && tracker !== null ? tracker.id! : tracker;

        return $fetch<Response<null>>('/api/tracker/' + id, {
            method: 'DELETE'
        }).then(response => {
            delete trackerMap.value[id]
            notify(Level.SUCCESS, response.data.statusMessage)
            return response
        }).catch((response) => {
            notify(Level.DANGER, response.data.statusMessage)
            return response
        })
    }

    return {tracker, get, today, empty, fetch, create, update, destroy}
})