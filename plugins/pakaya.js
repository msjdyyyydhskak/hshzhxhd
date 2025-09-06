const { cmd } = require('../lib/command');
const yts = require('yt-search');
const axios = require("axios");

cmd({
    pattern: "song00",
    alias: "play",
    desc: "To download songs.",
    react: "🎵",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        q = q ? q : ''; 
        if (!q) return reply("*`Need YT_URL or Title`*");

        reply("*_🎵 Song found, uploading please wait..._*");

        const search = await yts(q);
        if (!search.videos || search.videos.length === 0) {
            return reply("❌ No results found for \"" + q + "\".");
        }

        const data = search.videos[0];
        const url = data.url;
        let desc = `
┏「▃𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯 𝐀𝐔𝐃𝐈𝐎▃」
┃ 👨‍💻Owner: 𝘾𝙝𝙚𝙩𝙝𝙞𝙮𝙖 𝙬𝙚𝙙𝙖𝙨𝙞𝙣𝙜𝙖
┃ 🤖 Bot Name: 𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯
┗━━━━━━━━━━━━━━━𖣔𖣔
┏━❮ 𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯❯━
┃🤖 *Title:* ${data.title}
┃📑 *Duration:* ${data.timestamp}
┃🔖 *Views:* ${data.views}
┃📟 *Uploaded On:* ${data.ago}
┃👨‍💻 Owner: Chetiya Wedasinga 
┗━━━━━━━━━━━━━━𖣔𖣔

> 🄿🄾🅆🄴🅁🄳 🅱🆈  😈 𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯
`;

        

        const sentMsg = await conn.sendMessage(from, {
            image: { url: data.thumbnail },
            caption: desc,
            buttons: interactiveButtons,
            contextInfo: {
                mentionedJid: ['94702484047@s.whatsapp.net'],
                forwardingScore: 1,
                isForwarded: true
            }
        }, { quoted: mek });

        const messageID = sentMsg.key.id;

        conn.ev.on('messages.upsert', async (messageUpdate) => {
            try {
                const mek = messageUpdate.messages[0];
                if (!mek.message || !mek.key || mek.key.fromMe) return;

                const fromReply = mek.key.remoteJid;
                const senderReply = mek.key.participant || mek.key.remoteJid;

                const isReplyToSentMsg = mek.message?.extendedTextMessage?.contextInfo?.stanzaId === messageID;
                const btnId = mek.message?.buttonsResponseMessage?.selectedButtonId;

                if (isReplyToSentMsg && btnId) {
                   
                     await conn.sendMessage(fromReply, { react: { text: '⬇️', key: mek.key } });
const interactiveButtons = [
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "Download Audio 🎧",
                    id: "1"
                })
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "Download Document 📁",
                    id: "2"
                })
            }
        ];
                    const apiUrl = "https://api.giftedtech.web.id/api/download/dlmp3?apikey=gifted&url=" + encodeURIComponent(url);
                    const response = await axios.get(apiUrl);

                    if (!response.data.success) {
                        return reply("❌ Failed to fetch audio for \"" + q + "\".");
                    }

                    const { download_url: downloadUrl } = response.data.result;

                    if (btnId === '1') {
                        await conn.sendMessage(fromReply, {
                            audio: { url: downloadUrl },
                            mimetype: "audio/mp4",
                            ptt: false
                        }, { quoted: mek });
                    } else if (btnId === '2') {
                        await conn.sendMessage(fromReply, {
                            document: { url: downloadUrl },
                            mimetype: "audio/mp3",
                            fileName: `${data.title}.mp3`,
                            caption: "> 🄿🄾🅆🄴🅁🄳 🅱🆈  😈 𝕮𝖍𝖊𝖙𝖍𝖎𝖞𝖆_𝕸𝕯"
                        }, { quoted: mek });
                    }

                    await conn.sendMessage(fromReply, { react: { text: '⬆️', key: mek.key } });
                }
                
            } catch (err) {
                console.log("Button response error:", err);
            }
        });

    } catch (e) {
        console.log("Main error:", e);
        reply("❌ An error occurred while processing your request.");
    }
    
    
    
});