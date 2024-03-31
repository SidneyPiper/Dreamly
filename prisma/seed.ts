import { PrismaClient } from '@prisma/client'
import { genSalt, hash } from "bcrypt-ts";

const prisma = new PrismaClient()

async function main() {
    const colors = ['#FDE4CF', '#FFCFD2', '#F1C0E8', '#CFBAF0', '#A3C4F3', '#90DBF4', '#8EECF5', '#98F5E1', '#B9FBC0']
    const tags = ['OCaml', 'Monade', 'Funktor', 'Nuxt', 'Party Nuts', 'Haskell', 'Sigma', 'NSFW', 'Rust']

    let userTags = []

    const salt = await genSalt(10);
    const hashed_pasword = await hash('password', salt);

    const user = await prisma.user.create({
        data: {
            name: 'username',
            email: 'eigentlich@egal.de',
            password: hashed_pasword
        }
    })

    for (const hex of colors) {
        const color = await prisma.color.create({
            data: {
                hex: hex
            }
        })

        const tag = await prisma.tag.create({
            data: {
                label: tags.shift()!,
                userId: user.id,
                colorId: color.id
            }
        })

        userTags.push(tag)
    }





}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
