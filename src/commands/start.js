import prisma from "../config/prisma.js";

const start = async (ctx) => {
    const episodeID = ctx.startPayload;

    const userId = ctx.from.id.toString();

    const user = await prisma.fileShareUsers.findUnique({
        where: {
            userId,
        },
    });

    if (!user) {
        await prisma.fileShareUsers.create({
            data: {
                first_name: ctx.from.first_name,
                last_name: ctx.from.last_name,
                is_bot: ctx.from.is_bot,
                language_code: ctx.from.language_code,
                userId,
                is_premium: ctx.from.is_premium || false,
            },
        });
    }

    let member = null;

    try {
        member = await ctx.telegram.getChatMember(
            "-1001781779494",
            ctx.from.id
        );
    } catch (error) {}

    if (!member) {
        await ctx.reply(
            `Salut ${ctx.from.first_name}\n\nVous devez rejoindre mon canal pour pouvoir m'utiliser`,
            {
                reply_to_message_id: ctx.message.message_id,
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "Rejoindre",
                                url: "https://t.me/+jQMWCWjZ1DJhNjVk",
                            },
                        ],
                        [
                            {
                                text: "Réessayer",
                                url: `https://t.me/${ctx.botInfo.username}?start=${episodeID}`,
                            },
                        ],
                    ],
                },
            }
        );

        return;
    }

    if (!episodeID) {
        ctx.reply(
            "Welcome to Anime Share Bot. I can send you Animes Video.\n\nPowered by @AnimesGratuit"
        );
        return;
    }

    const msg = await ctx.reply("Veuillez patienter...");

    const file = await prisma.file.findFirst({
        where: {
            id: episodeID,
        },
        select: {
            files_info: true,
        },
    });

    await ctx.deleteMessage(msg.message_id);

    if (!file) {
        await ctx.reply("Le fichier est introuvable ❌");
        return;
    }

    let interval = null;
    let i = -1;

    const sorted_file_info = file.files_info.sort(
        (a, b) => a.createdAt - b.createdAt
    );

    interval = setInterval(async () => {
        if (i >= file.files_info.length - 1) {
            clearInterval(interval);

            await ctx.sendSticker(
                "CAACAgUAAxkBAAIGumUhZHpHHWNhkFuC5oYyMHwUMZzrAAKZAAOpmuYWfOMe2DS8IdcwBA"
            );

            setTimeout(async () => {
                await ctx.reply(
                    "Rejoignez notre chaîne pour plus de animes🔥\n\n👉 @AnimesGratuit\n👉 @AnimesGratuit"
                );
            }, 50);
            return;
        }

        i++;

        ctx.sendDocument(sorted_file_info[i].tg_file_id, {
            caption: sorted_file_info[i]?.caption || "",
        });
    }, 50);
};

export { start };
