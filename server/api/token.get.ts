import { getToken } from '#auth'

export default defineEventHandler(event => getToken({ event }))