// file: ~/server/api/token.get.ts
import { getToken } from '#auth'

export default defineEventHandler(event => getToken({ event }))