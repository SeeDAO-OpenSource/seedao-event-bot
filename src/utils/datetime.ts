import ics from "@/config/ics"

function getDayOfWeekZh(time: number): string {
    const date = new Date(new Date(time).toLocaleString("en-US", { timeZone: ics.timezone }));
    const dayofweek = date.getDay();
    if (dayofweek === 0) {
        return '(日)';
    } else if (dayofweek === 1) {
        return '(一)';
    } else if (dayofweek === 2) {
        return '(二)';
    } else if (dayofweek === 3) {
        return '(三)';
    } else if (dayofweek === 4) {
        return '(四)';
    } else if (dayofweek === 5) {
        return '(五)';
    } else if (dayofweek === 6) {
        return '(六)';
    }
    return '';
}

function dayOfWeekZhToEn(dayofweek: string): string {
    if (dayofweek === '(日)') {
        return 'SUN';
    } else if (dayofweek === '(一)') {
        return 'MON';
    } else if (dayofweek === '(二)') {
        return 'TUE';
    } else if (dayofweek === '(三)') {
        return 'WED';
    } else if (dayofweek === '(四)') {
        return 'THU';
    } else if (dayofweek === '(五)') {
        return 'FRI';
    } else if (dayofweek === '(六)') {
        return 'SAT';
    }
    return dayofweek;
}

function getLocalDatetime(time: number): Date {
    return new Date(new Date(time).toLocaleString("en-US", { timeZone: ics.timezone }));
}

function getLocalDate(time: number): string {
    const date = getLocalDatetime(time);
    return date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2);
}

function getLocalHHMM(time: number): string {
    const date = getLocalDatetime(time);
    return ('0' + date.getHours()).slice(-2) + ":"
        + ('0' + date.getMinutes()).slice(-2)
}

function isTodayEvent(start: number, end: number): boolean {
    const today = getLocalDate(new Date().getTime());
    return getLocalDate(start) === today || getLocalDate(end) === today
}

function getMonday(time: Date): Date {
    const weekstart = time.getDate() - time.getDay() + 1;
    const monday = getLocalDatetime(new Date(time.setDate(weekstart)).getTime());
    monday.setHours(0, 0, 0, 0);
    return monday;
}

function getSunday(time: Date): Date {
    const weekend = time.getDate() - time.getDay() + 7;
    const sunday = getLocalDatetime(new Date(time.setDate(weekend)).getTime());
    sunday.setHours(23, 59, 59, 999);
    return sunday;
}

function isThisWeekEvent(start: number, end: number): boolean {
    const current = getLocalDatetime(new Date().getTime());
    const monday = getMonday(current);
    const sunday = getSunday(current);
    return start >= monday.getTime() && start <= sunday.getTime();
}

function isAllDayEvent(start: number, end: number): boolean {
    return getLocalDate(start) < getLocalDate(end) && end - start >= (86400000);
}


export default {
    getDayOfWeekZh,
    getLocalDatetime,
    getLocalDate,
    getLocalHHMM,
    isTodayEvent,
    getMonday,
    getSunday,
    isThisWeekEvent,
    isAllDayEvent,
    dayOfWeekZhToEn,
}