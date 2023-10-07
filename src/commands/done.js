import prisma from "../config/prisma.js";

const Done = async (ctx) => {
    if (
        ctx.from.id === 1782278519 &&
        ctx.message.text.toLowerCase() === "done"
    ) {
        const currentProcess = await prisma.currentProcess.findFirst({
            select: {
                files: {
                    select: {
                        caption: true,
                        tg_file_id: true,
                        createdAt: true,
                    },
                },
            },
        });

        const storedFile = await prisma.file.create({
            data: {
                files_info: {
                    createMany: {
                        data: [...currentProcess.files],
                    },
                },
            },
            include: {
                files_info: true,
            },
        });

        await prisma.currentProcess.deleteMany();

        await ctx.reply(
            `Bundle is available at https://t.me/${ctx.botInfo.username}?start=${storedFile.id}`,
            {
                reply_markup: {
                    remove_keyboard: true,
                },
            }
        );

        return;
    }
};

export { Done };
