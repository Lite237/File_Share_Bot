import prisma from "../config/prisma.js";

const addDocument = async (ctx) => {
    if (ctx.from.id !== 1782278519) {
        return;
    }

    const fileInfo = await prisma.fileInfo.create({
        data: {
            caption: ctx.message.caption || "",
            tg_file_id: ctx.message.document.file_id,
        },
    });

    const currentProcess = await prisma.currentProcess.findFirst();

    if (!currentProcess) {
        await prisma.currentProcess.create({
            data: {
                files: {
                    connect: {
                        id: fileInfo.id,
                    },
                },
            },
            include: {
                files: true,
            },
        });
    }

    if (currentProcess) {
        await prisma.currentProcess.update({
            where: {
                id: currentProcess.id,
            },
            data: {
                files: {
                    connect: {
                        id: fileInfo.id,
                    },
                },
            },
            select: {
                files: true,
            },
        });
    }

    ctx.reply(`File added to bundle`, {
        reply_to_message_id: ctx.message.message_id,
        reply_markup: {
            keyboard: [[{ text: "Done" }]],
            resize_keyboard: true,
        },
    });
};

export { addDocument };
