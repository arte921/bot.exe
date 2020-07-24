const fs = require("fs")
const path = process.cwd()
const config = JSON.parse(fs.readFileSync(path + "/config.json").toString())

const helptext = `
***S S H***

All commands prefixed with ${config.prefix}, without additional spaces.

general commands:
    without arguments:
        ping
        help
        rtfm
        uptime

    with arguments:
        say [text]
        scream [text]
        whisper [text]
        mock [text]
        uwu [text]
        emoji [max emojis per word] [text]

music commands:
    without arguments:
        pause
        resume
        stop

    with arguments:
        play [youtube url]
        volume [percentage]
`

const gnu = `
I'd just like to interject for a moment.  What you're referring to as Linux,
is in fact, GNU/Linux, or as I've recently taken to calling it, GNU plus Linux.
Linux is not an operating system unto itself, but rather another free component
of a fully functioning GNU system made useful by the GNU corelibs, shell
utilities and vital system components comprising a full OS as defined by POSIX.

Many computer users run a modified version of the GNU system every day,
without realizing it.  Through a peculiar turn of events, the version of GNU
which is widely used today is often called "Linux", and many of its users are
not aware that it is basically the GNU system, developed by the GNU Project.

There really is a Linux, and these people are using it, but it is just a
part of the system they use.  Linux is the kernel: the program in the system
that allocates the machine's resources to the other programs that you run.
The kernel is an essential part of an operating system, but useless by itself;
it can only function in the context of a complete operating system.  Linux is
normally used in combination with the GNU operating system: the whole system
is basically GNU with Linux added, or GNU/Linux.  All the so-called "Linux"
distributions are really distributions of GNU/Linux.
`

const simp = `
Excuse me sir or ma'am

but I couldn't help but notice.... are you a "girl"?? A "female?" A "member of the finer sex?"

Not that it matters too much, but it's just so rare to see a girl around here! I don't mind, no--quite to the contrary! It's so refreshing to see a girl online, to the point where I'm always telling all my friends "I really wish girls were better represented on the internet."

And here you are!

I don't mean to push or anything, but if you wanted to DM me about anything at all, I'd love to pick your brain and learn all there is to know about you. I'm sure you're an incredibly interesting girl--though I see you as just a person, really--and I think we could have lots to teach each other.

I've always wanted the chance to talk to a gorgeous lady--and I'm pretty sure you've got to be gorgeous based on the position of your text in the picture--so feel free to shoot me a message, any time at all! You don't have to be shy about it, because you're beautiful anyways (that's juyst a preview of all the compliments I have in store for our chat).

Looking forwards to speaking with you soon, princess!

EDIT: I couldn't help but notice you haven't sent your message yet. There's no need to be nervous! I promise I don't bite, haha

EDIT 2: In case you couldn't find it, you can click the little chat button from my profile and we can get talking ASAP. Not that I don't think you could find it, but just in case hahah

EDIT 3: look I don't understand why you're not even talking to me, is it something I said?
`

const anthem = `
Союз нерушимый республик свободных
Сплотила навеки Великая Русь
Да здравствует созданный волей народов
Единый, могучий Советский Союз
Славься, Отечество наше свободное
Дружбы народов надёжный оплот!
Партия Ленина - сила народная
Нас к торжеству коммунизма ведёт
Сквозь грозы сияло нам солнце свободы
И Ленин великий нам путь озарил
На правое дело он поднял народы
На труд и на подвиги нас вдохновил
Славься, Отечество наше свободное
Дружбы народов надёжный оплот
Партия Ленина - сила народная
Нас к торжеству коммунизма ведёт
В победе бессмертных идей коммунизма
Мы видим грядущее нашей страны
И Красному знамени славной Отчизны
Мы будем всегда беззаветно верны
Славься, Отечество наше свободное
Дружбы народов надёжный оплот
Партия Ленина - сила народная
Нас к торжеству коммунизма ведёт
`

let finalobject = [
    {
        regex: "/(^| )(girl|female|woman|lady)($| )/",
        copypasta: simp,
        enabled: true
    }, {
        regex: "/(^| )(anthem)($| )/",
        copypasta: anthem,
        enabled: true
    }, {
        regex: "/(^| )(linux)($| )/",
        copypasta: gnu,
        enabled: true
    }
]

fs.writeFileSync(path + "/copypasta.json", JSON.stringify(finalobject))