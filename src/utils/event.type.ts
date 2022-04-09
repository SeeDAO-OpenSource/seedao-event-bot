export type Event = {
    starttime: number,
    date: string,
    dayofweek: string,
    start: string,
    end: string,
    allday: boolean,
    title: string,
    titlelen: number,
}

export type ReplyFile = {
    filename: string,
    value: any,
}

export type ReplyImages = {
    files: ReplyFile[]
}
