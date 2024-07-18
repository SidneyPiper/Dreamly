// file: ~/server/api/auth/[...].ts
import {PrismaAdapter} from '@auth/prisma-adapter'
import {PrismaClient} from '@prisma/client'
import {compare} from "bcrypt-ts";
import GithubProvider from "@auth/core/providers/github"
import CredentialsProvider from "@auth/core/providers/credentials"
import {AuthConfig} from "@auth/core";
import {NuxtAuthHandler} from "#auth";

const prisma = new PrismaClient()

const runtimeConfig = useRuntimeConfig()

export const authOptions: AuthConfig = {
    secret: runtimeConfig.authJs.secret,
    pages: {
        signIn: '/login'
    },
    session: {
        strategy: 'jwt'
    },
    adapter: PrismaAdapter(prisma) as any,
    callbacks: {
        jwt: async ({token, user}) => {
            const isSignIn = !!user;
            if (isSignIn) {
                token.id = user ? user.id || '' : '';
            }
            return Promise.resolve(token);
        },
        session: async ({session, token}) => {
            (session as any).user.id = token.id
            return Promise.resolve(session)
        },
    },
    providers: [
        GithubProvider({
            clientId: runtimeConfig.github.clientId,
            clientSecret: runtimeConfig.github.clientSecret
        }),
        CredentialsProvider({
            async authorize(credentials) {
                const user = await prisma.user.findFirst({
                    where: {
                        OR: [{name: credentials.username!}, {email: credentials.username!}]
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
                    return null
                }

                const valid = await compare(credentials.password as string, user?.password as string)

                if (valid) {
                    return user
                } else {
                    return null
                }
            }
        })
    ]
}

export default NuxtAuthHandler(authOptions, runtimeConfig)