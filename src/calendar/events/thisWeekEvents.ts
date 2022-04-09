import type { Event, ReplyImages } from "@/utils/event.type";

import imageList from '@/config/images';
import fontList from '@/config/fonts';
import icalHandler from '@/calendar/events/icalHandler';
import dtUtils from '@/utils/datetime';
import strUtils from '@/utils/string';

const { createCanvas, registerFont, loadImage } = require('canvas');
const imageDefaultWidth = 1280;
const widthMaxStringLen = 50;
const imageDefaultHeight = 1024;
const footerText = 'Powered by SeeDAO'

function getThisWeekEvents(events: any, fyi: string[]): Event[] {
    const thisWeekEvents: Event[] = [];
    for (let i = fyi.length - 2; i >= 0; i--) {
        if (dtUtils.isThisWeekEvent(events[fyi[i]].start, events[fyi[i]].end)) {
            thisWeekEvents.push({
                starttime: Number(events[fyi[i]].start),
                date: dtUtils.getLocalDate(events[fyi[i]].start),
                dayofweek: dtUtils.getDayOfWeekZh(events[fyi[i]].start),
                start: dtUtils.getLocalHHMM(events[fyi[i]].start),
                end: dtUtils.getLocalHHMM(events[fyi[i]].end),
                allday: dtUtils.isAllDayEvent(events[fyi[i]].start, events[fyi[i]].end),
                title: events[fyi[i]].summary,
                titlelen: strUtils.strLen(events[fyi[i]].summary)
            });
        }
    }
    thisWeekEvents.sort((a, b) => {
        return a.starttime - b.starttime;
    });
    return thisWeekEvents;
}

async function getImage(): Promise<ReplyImages> {
    return new Promise<ReplyImages>((resolve) => {
        icalHandler.getEvents().then((e) => {
            const events = getThisWeekEvents(e.events, e.fyi);

            // 先計算目前的長度 
            const titleFontSize = 60;
            const rowMarkX = 10;
            const rowMarkShiftY = -10;
            const rowMarkFontSize = 50;
            const contentTitleX = 140;
            const contentTitleY = 100;

            const contentShiftY = 230;
            const contentRowY = 170;
            const contentFontSize = 40;
            const contentRowTitleShiftY = 50;
            const footerFontSize = 50;

            const contentSizeY = contentShiftY + contentRowY * events.length;
            const maxTitleLen = Math.max(...events.map(e => e.titlelen));

            // Resolution 分辨率
            const width = Math.max(imageDefaultWidth * (maxTitleLen + 0.0) / widthMaxStringLen, imageDefaultWidth);
            const height = Math.max(contentSizeY, imageDefaultHeight);

            // Init 初始化
            const canvas = createCanvas(width, height);
            const ctx = canvas.getContext('2d');

            // Fonts 字体
            const mainFont = fontList[1];
            registerFont(mainFont.path, { family: mainFont.family });

            // Background 背景
            loadImage(imageList.events.seedaobg).then((bg) => {
                ctx.drawImage(bg, 0, 0, width, height);

                // Title 标题
                ctx.font = `bold ${titleFontSize}px ${mainFont.family}`
                ctx.fillStyle = "#000000";
                const monday = dtUtils.getLocalDate(dtUtils.getMonday(new Date()).getTime());
                const sunday = dtUtils.getLocalDate(dtUtils.getSunday(new Date()).getTime());
                ctx.fillText(`${monday} ~ ${sunday} 本周活动`, contentTitleX, contentTitleY)

                // Content 内容
                let dayofweek = '';
                events.forEach((event, idx) => {

                    // 前缀
                    if (event.dayofweek !== dayofweek) {
                        ctx.font = `${rowMarkFontSize}px ${mainFont.family}`
                        ctx.fillStyle = "#A29C99";
                        ctx.fillText(dtUtils.dayOfWeekZhToEn(event.dayofweek).replace(/[()]/gi, ''),
                            rowMarkX, contentShiftY + contentRowY * idx + contentRowTitleShiftY + rowMarkShiftY)
                        dayofweek = event.dayofweek;
                    }

                    ctx.font = `${contentFontSize}px ${mainFont.family}`
                    ctx.fillStyle = "#2837FF";
                    if (event.allday) ctx.fillText(event.date + event.dayofweek + ' 全天',
                        contentTitleX, contentShiftY + contentRowY * idx)
                    else ctx.fillText(event.date + event.dayofweek + ' ' + event.start + ' ~ ' + event.end,
                        contentTitleX, contentShiftY + contentRowY * idx);

                    ctx.fillStyle = "#000000";
                    ctx.fillText(event.title, contentTitleX, contentShiftY + contentRowY * idx + contentRowTitleShiftY)
                })

                // Footer
                ctx.font = `${footerFontSize}px ${mainFont.family}`
                ctx.fillStyle = "#A29C99";
                ctx.fillText(footerText, width - 530, height - 32);

                // 回传档案
                resolve({ files: [{ filename: "thisWeekEvent.png", value: canvas.toBuffer('image/png') }] });
            });
        });
    });
}

export default {
    getImage,
}