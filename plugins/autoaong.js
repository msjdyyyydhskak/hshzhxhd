const { cmd } = require('../lib/command');
const yts = require('yt-search');
const ddownr = require('denethdev-ytmp3');

const autoSongIntervals = {};

// Format number/group/channel to proper JID
function formatJid(input) {
    input = input.trim();
    if (
        input.endsWith('@s.whatsapp.net') ||
        input.endsWith('@g.us') ||
        input.endsWith('@broadcast') ||
        input.endsWith('@newsletter')
    ) {
        return input;
    } else if (/^\d{5,}$/.test(input)) {
        return `${input}@s.whatsapp.net`;
    } else {
        return null;
    }
}

// Get random Sinhala song
async function getRandomSong() {
    const sinhalaKeywords = ['zany', 'ramidu', 'Mihiran', 'Uvindu Ayeshcharya', 'smokio', 'DILU Beats song'];
    const randomKeyword = sinhalaKeywords[Math.floor(Math.random() * sinhalaKeywords.length)];
    const search = await yts(randomKeyword);
    const videos = search.videos;
    return videos[Math.floor(Math.random() * videos.length)];
}

// START SONG COMMAND
cmd({
    pattern: "startsong",
    alias: "autosong",
    react: "⬆️",
    desc: "Start auto sending Sinhala songs",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { q, reply, isOwner }) => {
    if (!isOwner) return reply("*Owner only command*");
    if (!q) return reply("*Ex: .startsong 9476xxx,groupjid@g.us*");

    const rawJids = q.split(',').map(j => j.trim());
    const jids = rawJids.map(formatJid).filter(Boolean);

    if (jids.length === 0) return reply("*No valid JIDs found!*");

    for (const jid of jids) {
        if (autoSongIntervals[jid]) {
            clearInterval(autoSongIntervals[jid]);
            delete autoSongIntervals[jid];
        }

        reply(`✅ Auto song started for: ${jid}`);

        const autoUploadSong = async () => {
            try {
                const data = await getRandomSong();
                const url = data.url;

                const desc = `*🎧 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Auto Song ...*
🎶 *Title:* ${data.title} 🎧

🍂 *Duration:* ${data.timestamp}

🔖 *Uploaded On:* ${data.ago}

> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟`;

                // Thumbnail message
                if (jid.endsWith('@newsletter')) {
                    await conn.sendMessage(jid, {
                        messageType: 12,
                        image: { url: data.thumbnail },
                        caption: desc
                    });
                } else {
                    await conn.sendMessage(jid, {
                        image: { url: data.thumbnail },
                        caption: desc
                    });
                }

                const result = await ddownr.download(url, 'mp3');

                // Audio message
                const audioMsg = {
                    audio: { url: result.downloadUrl },
                    mimetype: "audio/mpeg",
                    ptt: true,
                    contextInfo: {
                        externalAdReply: {
                            title: data.title,
                            body: data.videoId,
                            mediaType: 1,
                            sourceUrl: data.url,
                            thumbnailUrl: data.thumbnail,
                            renderLargerThumbnail: true,
                            showAdAttribution: true
                        }
                    }
                };

                if (jid.endsWith('@newsletter')) {
                    audioMsg.messageType = 12;
                }

                await conn.sendMessage(jid, audioMsg);

            } catch (err) {
                console.error(`Auto-upload error for ${jid}:`, err);
            }
        };

        autoSongIntervals[jid] = setInterval(autoUploadSong, 15 * 60 * 1000); // 15 minutes
    }
});

// STOP SONG COMMAND
cmd({
    pattern: "stopsong",
    desc: "Stop auto Sinhala songs",
    react: "🛑",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { q, reply, isOwner }) => {
    if (!isOwner) return reply("*Owner only command*");
    if (!q) return reply("*Ex: .stopsong 9476xxx,groupjid@g.us*");

    const rawJids = q.split(',').map(j => j.trim());
    const jids = rawJids.map(formatJid).filter(Boolean);

    for (const jid of jids) {
        if (autoSongIntervals[jid]) {
            clearInterval(autoSongIntervals[jid]);
            delete autoSongIntervals[jid];
            reply(`🛑 Auto song stopped for: ${jid}`);
        } else {
            reply(`⚠️ No auto song running for: ${jid}`);
        }
    }
});

// LIST ACTIVE AUTO SONG JIDS
cmd({
    pattern: "listsong",
    desc: "List active auto song JIDs",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { reply, isOwner }) => {
    if (!isOwner) return reply("*Owner only command*");

    const activeJids = Object.keys(autoSongIntervals);
    if (activeJids.length === 0) {
        return reply("❌ Currently no auto song is running.");
    }

    const list = activeJids.map((jid, i) => `*${i + 1}.* ${jid}`).join("\n");
    reply(`✅ *Auto Songs Running For:*\n\n${list}`);
});