<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="register">
            <input v-model="name" type="text" placeholder="Username" />
            <input v-model="email" type="text" placeholder="Email" />
            <input v-model="password" type="text" placeholder="Password" />
            <button>Register</button>
        </form>
    </div>
</template>

<script setup>
const name = ref('')
const email = ref('')
const password = ref('')
const status = ref(false)

async function register() {
    status.value = await $fetch('/api/register', {
        method: 'POST',
        body: {
            name: name.value,
            email: email.value,
            password: password.value
        }
    })

    if (status.value) {
        await navigateTo('/login')
    }
}
</script>