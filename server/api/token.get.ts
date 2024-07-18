import {getServerToken} from '#auth'
import {authOptions} from "~/server/api/auth/[...]";

export default defineEventHandler(event => getServerToken(event, authOptions))