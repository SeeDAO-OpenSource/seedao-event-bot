require('dotenv').config();
const { CommandClient } = require('detritus-client');

// 请避免把 TOKEN 直接写在机器人程序中, 避免骇客攻击与隐私泄漏
const token = process.env.TOKEN;
const commandClient = new CommandClient(token, {
    prefix: '..',
});

/*
    Ping/Pong 指令, 检查机器人是否连线正常
    使用方式: @bot ping
*/
commandClient.add({
    name: 'ping',
    run: (context) => {
        return context.reply(`pong!`);
    },
});

/*
    Owner 指令, 只有机器人拥有者才能执行的指令, 方便做权限管理
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
    Args 指令, 检查指令输入后, 机器人是否正确读取到了指令的各项参数
    参数会以 string 方式读入, 需要进一步拆解并处理
    使用方式: @bot arg a1:a2:a3,b1:b2:b3,c1:c2:c3
*/
commandClient.add({
    name: 'args',
    run: (context, args) => {
        return context.reply(`Args: ${JSON.stringify(args)}`);
    },
});

(async () => {
    const client = await commandClient.run();
    console.log(`\nClient has loaded with a shard count of ${client.shardCount} \n`);
})();
