require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { CommandClient } = require('detritus-client');

import 'module-alias/register';
import todayEvents from "./calendar/events/todayEvents";
import thisWeekEvents from "./calendar/events/thisWeekEvents";


// 请避免把 TOKEN 直接写在机器人程序中, 避免骇客攻击与隐私泄漏
const token = process.env.TOKEN;
const commandClient = new CommandClient(token, {
    prefix: '..',
});


/*
    [ ping/pong 指令 ] 检查机器人是否连线正常
    使用方式: @bot ping
*/
commandClient.add({
    name: 'ping',
    run: (context) => {
        return context.reply(`pong!`);
    },
});

/*
    [ owner 指令 ] 只有机器人拥有者才能执行的指令, 方便做权限管理
    使用方式: @bot owner
*/
commandClient.add({
    name: 'owner',
    onBefore: (context) => context.client.isOwner(context.userId),
    onCancel: (context) => context.reply('This command is only available to the bot owner.'),
    run: async (context) => {
        await context.reply('You are the owner of the bot!');
    },
});

/*
    [ args 指令 ] 检查指令输入后, 机器人是否正确读取到了指令的各项参数
    参数会以 string 方式读入, 需要进一步拆解并处理
    使用方式: @bot args arg1 arg2 arg3 arg4
*/
commandClient.add({
    name: 'args',
    run: (context, args) => {
        return context.reply(`Args: ${JSON.stringify(args)}`);
    },
});


/*
    [ images 指令 ] 检查是否能正常传送 image 到 Discord 中
    使用方式: @bot images
*/
commandClient.add({
    name: 'images',
    run: (context) => {
        const data = fs.readFileSync(path.resolve(__dirname, './images/background/seedao500x1000.png'));
        return context.reply({ files: [{ filename: "seedao.png", value: data }] });
    },
});

/*
    [ events 指令 ] 将活动信息做成图片传送到 Discord 中
    使用方式: 今日活动: @bot events today
             本周活动: @bot events week
*/
commandClient.add({
    name: 'events',
    run: async (context, args) => {
        const freq = args.events.replace(/\s/g, '');
        if (freq === "today") {
            return context.reply(await todayEvents.getImage());
        }
        else if (freq === "week") {
            return context.reply(await thisWeekEvents.getImage());
        }
    },
});

// 执行 Main function
(async () => {
    const client = await commandClient.run();
    console.log(`\nClient has loaded with a shard count of ${client.shardCount} \n`);
})();