export default defineEventHandler(async event => {
    if (!event.path.startsWith('/api')) return
    if (event.path.startsWith('/api/auth')) return

    if (!event.context.session) {
        throw createError({statusCode: 403, statusMessage: 'Unauthenticated'})
    }
})