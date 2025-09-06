const { cmd } = require('../lib/command');
const yts = require('yt-search');
const axios = require('axios');
const { getBuffer } = require('../lib/functions');

cmd({
    pattern: "ytmp3btn",
    alias: ["songbtn", "playbtn"],
    desc: "Download YouTube song as MP3 or document with button",
    category: "download",
    react: "🎶",
    filename: __filename
}, 
async (conn, m, { from, reply, args, q }) => {
    if (!q) return reply("❌ Please provide a song name or YouTube link.");

    try {
        const search = await yts(q);
        const video = search.videos[0];

        if (!video) return reply("❌ No results found.");

        const title = video.title;
        const url = video.url;
        const thumb = await getBuffer(video.thumbnail);

        const caption = `🎵 *Title:* ${title}\n📺 *Link:* ${url}\n\nChoose format to download:`;

        await conn.sendMessage(from, {
            image: thumb,
            caption,
            footer: "SL Chethiya YouTube Downloader",
            buttons: [
                {
                    buttonId: `ytmp3audio ${url}`,
                    buttonText: { displayText: "🎧 MP3 Audio" },
                    type: 1
                },
                {
                    buttonId: `ytmp3doc ${url}`,
                    buttonText: { displayText: "📄 MP3 Document" },
                    type: 1
                }
            ],
            headerType: 4
        }, { quoted: m });

    } catch (e) {
        console.error(e);
        reply("❌ Error occurred while fetching video.");
    }
});