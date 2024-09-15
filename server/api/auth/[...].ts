// file: ~/server/api/auth/[...].ts
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import {NuxtAuthHandler} from '#auth'
import {PrismaAdapter} from '@auth/prisma-adapter'
import {PrismaClient} from '@prisma/client'
import {compare} from "bcrypt-ts";

const prisma = new PrismaClient()

export default NuxtAuthHandler({
    secret: process.env.NUXT_NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    },
    session: {
        strategy: 'jwt'
    },
    adapter: PrismaAdapter(prisma) as any,
    callbacks: {
        // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
        jwt: async ({token, user}) => {
            const isSignIn = !!user;
            if (isSignIn) {
                token.id = user ? user.id || '' : '';

                const credentials = await prisma.user.findFirst({
                    where: {
                        id: user.id,
                    },
                    select: {
                        password: true
                    }
                })

                token.oauth = !credentials?.password;
            }
            return Promise.resolve(token);
        },
        // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
        session: async ({session, token}) => {
            (session as any).user.id = token.id as string
            (session as any).user.oauth = token.oauth
            return Promise.resolve(session)
        },
    },
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GithubProvider.default({
            clientId: useRuntimeConfig().githubClientId,
            clientSecret: useRuntimeConfig().githubClientSecret,
        }),
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({
            async authorize(credentials: any) {
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.name
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        password: true,
                        image: true
                    }
                })

                if (!user || !user.password) {
                    return false
                }

                const valid = await compare(credentials.password, user?.password as string)

                if (valid) {
                    return user
                } else {
                    return false
                }
            }
        })
    ],
})
