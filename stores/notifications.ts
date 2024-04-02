import {defineStore} from 'pinia'
import {v4 as uuid} from "uuid";

export enum Level {
    INFO = "info",
    WARNING = "warning",
    DANGER = "danger",
    SUCCESS = "success"
}

export interface Notification {
    id: string,
    level: Level,
    title?: string,
    message?: string
}

export const useNotificationsStore = defineStore('notification', () => {
    const notifications = ref<Notification[]>([])

    function notify(level: Level, title?: string, message?: string) {
        notifications.value.push({id: uuid(), level, title, message});

        setTimeout(() => {
            notifications.value.shift()
        }, 2000)
    }

    return {notifications, notify}
})