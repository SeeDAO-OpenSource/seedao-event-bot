const ical = require('node-ical');
const ics = require('@/config/ics');

async function getEvents() {
    const events = await ical.async.fromURL(ics.default.seedao);
    const fyi = Object.keys(events);
    return { events, fyi };
}

export default {
    getEvents,
}
