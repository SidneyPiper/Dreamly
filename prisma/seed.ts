import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const colors = ['#FDE4CF', '#FFCFD2', '#F1C0E8', '#CFBAF0', '#A3C4F3', '#90DBF4', '#8EECF5', '#98F5E1', '#B9FBC0']

    await prisma.color.deleteMany({ where: {} })

    for (const color of colors) {
        await prisma.color.create({
            data: {
                hex: color
            }
        })
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
