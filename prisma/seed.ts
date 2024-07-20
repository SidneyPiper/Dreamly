import {PrismaClient} from '@prisma/client'
import {genSalt, hash} from "bcrypt-ts";
import {DateTime} from "luxon";

const prisma = new PrismaClient()

async function main() {
    const colors = ['#FDE4CF', '#FFCFD2', '#F1C0E8', '#CFBAF0', '#A3C4F3', '#90DBF4', '#8EECF5', '#98F5E1', '#B9FBC0']
    const tags = ['OCaml', 'Monade', 'Funktor', 'Nuxt', 'Party Nuts', 'Haskell', 'Sigma', 'NSFW', 'Rust']
    const dreams = [{
        title: 'Das Labyrinth der Haskell-Herausforderung',
        content: 'Ich wandere durch ein Labyrinth aus schimmerndem Code, jede Wand besteht aus komplexen Haskell-Funktionen und unbekannten Typen. Jeder Schritt fordert mich heraus, die Grenzen der funktionalen Programmierung zu überwinden. Die Luft ist mit dem Summen von Lambdas erfüllt, während ich verzweifelt versuche, den Ausgang zu finden. Doch je tiefer ich gehe, desto verwirrender wird es. Meine Gedanken werden zu endlosen Rekursionen, und ich stecke in einer Schleife fest. Schließlich erkenne ich, dass das Labyrinth nicht mein Feind ist, sondern mein Lehrer. Ich beginne, die Muster zu erkennen, die Struktur hinter dem Chaos. Mit jeder Lösung öffnet sich ein neuer Pfad, und ich verstehe, dass das Labyrinth nicht dazu bestimmt ist, mich zu fangen, sondern mich zu lehren.'
    }, {
        title: 'Die Java-Inferno-Debugging-Odyssee',
        content: 'Hitze umgibt mich, Flammen tanzen um mich herum, doch ihr Brennen kommt nicht von den Flammen der Hölle, sondern von den Zeilen meines Codes. Ich bin gefangen in einem Java-Inferno, wo jeder Fehler eine neue Herausforderung darstellt. Das Debuggen wird zu einem Kampf ums Überleben, während ich mich durch Stapel von Fehlermeldungen kämpfe und verzweifelt nach einem Ausweg suche. Aber je tiefer ich in die Glut des Codes eintauche, desto klarer wird mein Verständnis. Jeder Fehler, den ich finde und behebe, bringt mich näher an die Erlösung. Am Ende steige ich aus den Flammen empor, meine Codebasis gereinigt und gestärkt durch das Feuer.'
    }, {
        title: 'Die Vue.js-Zeitreise-Exploration',
        content: 'In einem verwunschenen Wald aus DOM-Elementen und Komponenten entdecke ich ein verborgenes Artefakt: die Zeitreise-Funktion von Vue.js. Mit einem Klick versetze ich mich zurück in die Vergangenheit meiner UI-Entwicklung. Ich sehe meine früheren Entscheidungen, meine Fehler und meine Fortschritte. Doch je weiter ich reise, desto mehr verschwimmen die Grenzen zwischen Vergangenheit, Gegenwart und Zukunft. Ich experimentiere mit neuen Ansätzen, verbessere meine Designs und sehe, wie sich meine Entscheidungen auf das Endergebnis auswirken. Am Ende kehre ich zurück, gestählt durch die Weisheit der Zeit.'
    }, {
        title: 'Der Funktionsrausch der funktionalen Programmierung',
        content: 'Ich betrete eine Welt jenseits von Variablen und Schleifen, eine Welt der reinen Funktionen und unveränderbaren Daten. Alles um mich herum pulsiert vor Energie, während Funktionen und Lambda-Ausdrücke miteinander verschmelzen. Ich tauche ein in den Funktionsrausch, lasse mich von der Schönheit der rekursiven Algorithmen und der eleganten Kompositionen mitreißen. Doch mit jedem Rausch kommt auch die Erkenntnis, dass die funktionale Programmierung mehr ist als nur eine Technik - sie ist eine Philosophie, eine Art zu denken. Und während ich durch diesen Rausch gleite, wird mir klar, dass die wahre Kraft nicht in den Funktionen selbst liegt, sondern in der Art und Weise, wie wir sie einsetzen, um die Welt zu gestalten.'
    }, {
        title: 'Die Next-Auth-Identitätskrise',
        content: 'Ich erwache in einer Welt, in der meine Identität ständig hinterfragt wird. Jeder Klick, jede Aktion führt zu neuen Herausforderungen in der Authentifizierung. Ich kämpfe gegen Zweifel und Unsicherheiten, während ich mich durch komplexe Authentifizierungsmechanismen kämpfe. Doch je mehr ich mich in diese Identitätskrise stürze, desto klarer wird mir, wer ich wirklich bin. Meine Authentizität liegt nicht in meinen Zugangsdaten oder meinen Berechtigungen, sondern in meiner Fähigkeit, mich selbst zu kennen und zu akzeptieren. Am Ende erkenne ich, dass die wahre Authentizität nicht von außen kommt, sondern von innen.'
    }, {
        title: 'Der Algorithmus-Albtraum',
        content: 'Ich versinke in einem endlosen Algorithmus, dessen Muster sich ständig ändern und anpassen. Jeder Schritt, den ich mache, führt zu neuen Herausforderungen und unerwarteten Wendungen. Ich kämpfe gegen die Dunkelheit der Unberechenbarkeit, gegen die Dämonen der Komplexität. Doch je mehr ich mich dem Albtraum stelle, desto klarer wird mir, dass die wahre Herausforderung nicht im Algorithmus selbst liegt, sondern in meiner Fähigkeit, mich anzupassen und zu überwinden. Ich finde Trost in der Gewissheit, dass auch der finsterste Albtraum irgendwann enden muss.'
    }, {
        title: 'Die Blockchain-Vision',
        content: 'Ich betrete eine Welt, die von einer unsichtbaren Kraft durchdrungen ist - der Blockchain. Jeder Block ist ein Teil eines größeren Ganzen, jede Transaktion ein Schritt in Richtung einer neuen Realität. Ich sehe die Welt mit neuen Augen, erkenne die Möglichkeiten und die Gefahren, die mit der Blockchain einhergehen. Doch je tiefer ich in diese Vision eintauche, desto klarer wird mir, dass die wahre Kraft der Blockchain nicht in den Daten liegt, sondern in den Menschen, die sie nutzen. Am Ende kehre ich zurück, bereichert durch die Erkenntnis, dass die Zukunft nicht in den Händen einer Technologie liegt, sondern in den Herzen der Menschen, die sie gestalten.'
    }
    ]

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


    for (const dream of dreams) {
        const r = Math.round(Math.random() * 5)
        const shuffled = userTags.sort(() => 0.5 - Math.random());
        let dreamTags = shuffled.slice(0, r);

        await prisma.user.update({
            where: {id: user.id},
            data: {
                dreams: {
                    create: [{
                        title: dream.title,
                        content: dream.content,
                        tags: {
                            connect: dreamTags
                        }
                    }]
                }
            }
        })
    }

    const start = DateTime.now().startOf('day')

    const trackerData = []
    for (let d = start; d > start.minus({year: 2}); d = d.minus({days: 1})) {
        const minQuality = 1
        const maxQuality = 5
        const minDuration = 6
        const maxDuration = 12

        const quality = Math.floor(Math.random() * maxQuality) + minQuality
        const duration = (Math.floor(Math.random() * (maxDuration - minDuration)) + (minDuration * 2)) * 30

        trackerData.push({
            userId: user.id,
            date: d.toJSDate(),
            quality,
            duration
        })
    }

    await prisma.trackerData.createMany({
        data: trackerData
    })
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
