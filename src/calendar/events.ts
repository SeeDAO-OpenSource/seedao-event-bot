calendar.getTodayEventsImage(freq).then((imagepath) => {
    const data = fs.readFileSync(imagepath);
    fs.unlinkSync(imagepath);
    return context.reply({ files: [{ filename: "images.png", value: data }] });


    calendar.getThisWeekEventsImage(freq).then((imagepath) => {
        const data = fs.readFileSync(imagepath);
        fs.unlinkSync(imagepath);
        return context.reply({ files: [{ filename: "images.png", value: data }] });
    })