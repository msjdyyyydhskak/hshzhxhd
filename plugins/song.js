const { cmd, commands } = require('../lib/command');
const yts = require('yt-search');
const { fetchJson } = require('../lib/functions');
const ddownr = require('denethdev-ytmp3');

// Function to extract the video ID from youtu.be or YouTube links
function extractYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Function to convert any YouTube URL to a full YouTube watch URL
function convertYouTubeLink(q) {
    const videoId = extractYouTubeId(q);
    if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return q;
}

cmd({
    pattern: "song",
    alias: "play",
    desc: "To download songs.",
    react: "🎵",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        q = convertYouTubeLink(q);
        if (!q) return reply("*මෝඩයෝ 🤭 ඔයා කමාන්ඩ් එක විතරක් Use කරාම කෝමද මම ඔයාගෙ හිතේ තීන සින්දුව දෙන්නෙ 🤭/n>ගුටි නොකා කමාන්ඩ් එකට පස්සෙ සින්දුව Type කරනව මැට්ටා 😅*");
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `*🎧 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝐁𝐄𝐓𝐀 Song Dawnloder .......*

● 🎧 *Title:* ${data.title}
● ⏱️ *Duration:* ${data.timestamp}
● 📅 *Uploaded:* ${data.ago}
● 👁️ *Views:* ${data.views}

◖┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉◗
*DAWNLOAD OPTIONS ⬇️*
◖┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉◗


│ 1️⃣ 🎧 *Audio*          
│ 2️⃣ 📄 *Document*       
│ 3️⃣ 🎙️ *Voice Note*

*මෝඩයෙක් නොවී උඩින් නම්බර් එකක් සිලෙක්ට් කරනව පිස්සො 🤭😩*

> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟
`;
let info = `
> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟
 `;   
const sentMsg = await conn.sendMessage(from, {
            image: { url: data.thumbnail},
            caption: desc,
  contextInfo: {
                mentionedJid: ['94727319036@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363292101892024@newsletter',
                    newsletterName: "𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟",
                    serverMessageId: 999
                }
            }
     }, {quoted: mek});
     
     const messageID = sentMsg.key.id; // Save the message ID for later reference


        // Listen for the user's response
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const from = mek.key.remoteJid;
            const sender = mek.key.participant || mek.key.remoteJid;

            // Check if the message is a reply to the previously sent message
            const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToSentMsg) {
                // React to the user's reply (the "1" or "2" message)

                // React to the upload (sending the file)
                

                if (messageType === '1') {
                    // Handle option 1 (Audio File)
                    await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
                const result = await ddownr.download(url, 'mp3'); // Download in mp3 format
                const downloadLink = result.downloadUrl;
                await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });  
                    await conn.sendMessage(from, { 
                        audio: { url: downloadLink }, 
                        mimetype: "audio/mpeg" ,
                        contextInfo: {
                            externalAdReply: {
                                title: data.title,
                                body: data.videoId,
                                mediaType: 1,
                                sourceUrl: data.url,
                                thumbnailUrl: data.thumbnail, // This should match the image URL provided above
                                renderLargerThumbnail: true,
                                showAdAttribution: true
                            }
                        }
                    
                    }, { quoted: mek });
                    await conn.sendMessage(from,);
                
                } else if (messageType === '2') {
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
                    const result = await ddownr.download(url, 'mp3'); // Download in mp3 format
                    const downloadLink = result.downloadUrl;
                await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    await conn.sendMessage(from, {
                        document: { url: downloadLink},
                        mimetype: "audio/mp3",
                        fileName: `${data.title}.mp3`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info
                                            
                      }, { quoted: mek });
                      await conn.sendMessage(from, );
                     } else if (messageType === '3') {
                     await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
                    const result = await ddownr.download(url, 'mp3'); // Download in mp3 format
                    const downloadLink = result.downloadUrl;
                await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });  
                    await conn.sendMessage(from, { 
                        audio: { url: downloadLink }, 
                        mimetype: "audio/mpeg" ,
                        ptt: "true" ,
                        contextInfo: {
                            externalAdReply: {
                                title: data.title,
                                body: data.videoId,
                                mediaType: 1,
                                sourceUrl: data.url,
                                thumbnailUrl: data.thumbnail, // This should match the image URL provided above
                                renderLargerThumbnail: true,
                                showAdAttribution: true
                            }
                        }
                    
                    }, { quoted: mek });
                    await conn.sendMessage(from,); 
                }
            }
        });
        
 } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
