import {defineStore} from 'pinia'


export const useNavbarStore = defineStore('navbar', () => {
    const open = ref<boolean>(true)
    const screenHeight = ref<number>(0)

    function showNavbar() {
        open.value = true
    }

    function hideNavbar() {
        open.value = false
    }


    return {open, screenHeight, showNavbar, hideNavbar}
})