# SeeDAO 的活动通知 Discord 机器人

鉴于 SeeDAO 资料几乎都储存在 Notion, 所以透过 Notion 作为资料库读取资料, 然后对应在 Discord 做交互
使用 Nodejs 与 Typescript 进行开发

## Discord 机器人 Token 申请

1. 请到 [Discord Developer Portal](https://discord.com/developers/applications) 申请 Token
2. 在本目录下开一个档案 `.env` 并放入 Token:
```sh
TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx      
```

## 开启机器人

请先确定有在 `.env` 放好 TOKEN, 如果要用到 Notion 需要提供 Notion API Key
关于 Notion API Key 申请方式请见: [取得 Notion API Key 流程](https://rowan-mollusk-a75.notion.site/Notion-API-Key-a81c61a2ce5648c8ac5d127deda253e7)

```sh
npm install
npm run start
```

## LICENSE

Apache 2.0