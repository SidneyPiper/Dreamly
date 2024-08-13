export default defineNuxtPlugin(() => {
    return {
        provide: {
            locally: {
                getItem(item: string) {
                    if (import.meta.client) {
                        return localStorage.getItem(item)
                    } else {
                        return null
                    }
                },
                setItem(item: string, value: any) {
                    if (import.meta.client) {
                        return localStorage.setItem(item, value)
                    }
                },
                removeItem(item: string) {
                    if (import.meta.client) {
                        return localStorage.removeItem(item)
                    }
                }
            }
        }
    }
})