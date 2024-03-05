<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="register">
            <input v-model="name" type="text" placeholder="Username" />
            <input v-model="email" type="text" placeholder="Email" />
            <input v-model="password" type="password" placeholder="Password" />
            <button>Register</button>
        </form>
    </div>
</template>

<script setup lang="ts">
const name = ref('')
const email = ref('')
const password = ref('')
var success = false

async function register() {
    success = await $fetch('/api/register', {
        method: 'POST',
        body: {
            name: name.value,
            email: email.value,
            password: password.value
        }
    })

    if (success) {
        await navigateTo('/login')
    }
}
</script>