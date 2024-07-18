export default defineEventHandler(async (event) => {
    const session = await getSession(event, {password: ""})
})