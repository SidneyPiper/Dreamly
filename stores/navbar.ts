import {defineStore} from 'pinia'


export const useNavbarStore = defineStore('navbar', () => {
    const open = ref<boolean>(true)

    function showNavbar() {
        open.value = true
    }

    function hideNavbar() {
        open.value = false
    }

    return {open, showNavbar, hideNavbar}
})