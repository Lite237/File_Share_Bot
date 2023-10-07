const handleError = async (err, ctx) => {
    await ctx.reply("Something Went wrong");
    console.log(err);
};

export { handleError };
