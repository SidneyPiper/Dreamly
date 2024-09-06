import {defineStore} from 'pinia'
import type {TrackerData} from "types";
import type {DurationLike} from "luxon";
import {DateTime} from "luxon";

export const useCalenderStore = defineStore('calender', () => {
    const months = ref<(Partial<TrackerData>[])[]>([])
    const {empty, between} = useTrackerStore()

    async function fetchOlder(duration: DurationLike) {
        let end = DateTime.now().minus({month: months.value.length}).endOf('month')
        let start = end.minus(duration).startOf('month')

        let month_rel = months.value.length;
        for (let d = end.startOf('month'); d >= start; d = d.minus({month: 1}).startOf('month')) {
            months.value[month_rel] = []

            for (let i = 0; i < d.daysInMonth; i++) {
                months.value[month_rel][i] = empty({
                    date: d.plus({days: i}).toJSDate()
                })
            }

            month_rel++
        }

        await between(start, end).then(results => {
            results.forEach(day => {
                const month = Math.floor(Math.abs(DateTime.fromJSDate(day.date).startOf('month').diffNow().as('months')))
                const dayOfMonth = DateTime.fromJSDate(day.date).day - 1

                if (!months.value[month]) months.value[month] = []
                months.value[month][dayOfMonth] = day
            })
        })
    }

    const updateDay = (tracker: TrackerData) => {
        console.log("updateDay Start")
        const date = DateTime.fromJSDate(tracker.date)
        if (date > DateTime.now()) return
        if (date < DateTime.now().minus({month: months.value.length})) return

        console.log("updateDay mid", date)

        const index = Math.floor(Math.abs(date.startOf('month').diffNow().as('months')))
        console.log("updateDay index", index)
        if (!months.value[index]) months.value[index] = []
        months.value[index][date.day - 1] = tracker

        console.log("calender store: ", months.value[index][date.day - 1])
    }

    return {months, fetchOlder, updateDay}
})