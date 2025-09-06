const config = require("../settings");
const prefix = config.PREFIX; // now hardcoded

const mono = "```";
const { cmd, commands } = require('../lib/command');
const os = require('os');
const fetch = require("node-fetch");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, fetchJson , runtime , sleep, mode, formatTime } = require('../lib/functions');
const moment = require("moment");

let botStartTime = Date.now();

cmd({
    pattern: "ali",
    desc: "Check bot online or no.",
    category: "main",
    use: ".alive2",
    react: "👋",
    filename: __filename
}, 
async (conn, mek, m, { from, pushname, reply }) => {
    try {
    
    const senderNumber = m.sender.split("@")[0];
        const senderName = pushname || "𝐒𝚄𝙻𝙰 𝐌𝙳 𝐔𝚂𝙴𝚁";

        // 🧠 Fake quoted message with user info
        const fakeQuoted = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                ...(from ? { remoteJid: "status@broadcast" } : {})
            },
            message: {
                extendedTextMessage: {
                    text: `👤 User: ${senderName}\n📱 Number: wa.me/${senderNumber}`,
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        externalAdReply: {
                            title: "SULA-MD",
                            body: "Create by Sulaksha Madara",
                            mediaType: 1,
                            thumbnailUrl: "https://i.ibb.co/jkmjpkMb/SulaMd.jpg",
                            sourceUrl: "https://sula-md.pages.dev",
                            renderLargerThumbnail: true
                        }
                    }
                }
            }
        };
        
        let des = `
> *𝐇𝐈.......👻*: ${pushname}

> *⏳Uptime*:  ${runtime(process.uptime())} 

> *📟 Ram*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB

   *𝐒𝐮𝐥𝐚 𝐌𝐃 Multidevice Whatsapp Bot Make By (Sulaksha Madara)*

     🫟 \`𝐉𝚘𝚒𝚗 𝐎𝚞𝚛 𝐂𝚑𝚊𝚗𝚗𝚎𝚕\` 🫟
> https://whatsapp.com/channel/0029Vb65iOZKwqSNKecV8V07

     🫟 \`𝐉𝚘𝚒𝚗 𝐎𝚞𝚛 𝐆𝚛𝚘𝚞𝚙\` 🫟
> https://chat.whatsapp.com/KhPaiN7u2Hs87AU7SODvZF
  
     🫟 \`𝐎𝚄𝚁 𝐖𝙴𝙱𝚂𝙸𝚃𝙴\` 🫟
> https://sula-md.pages.dev
  
> 𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳
`;

await conn.sendMessage(from, {
        video: {
            url: 'https://github.com/sulamadara1147/data/blob/main/VID-20250415-WA0268.mp4?raw=true'
        },
        mimetype: 'video/mp4',
        ptv: true
    }, { quoted: mek });
    
        await conn.sendMessage(from, {
    buttons: [
        {
            buttonId: `${prefix}menu`,
            buttonText: { displayText: 'MENU' },
            type: 1,
        },
        {
            buttonId: `${prefix}ping`,
            buttonText: { displayText: 'PING' },
            type: 1,
        },
        {
            buttonId: 'action',
            buttonText: {
                displayText: '📂 Menu Options'
            },
            type: 4,
            nativeFlowInfo: {
                name: 'single_select',
                paramsJson: JSON.stringify({
                    title: 'Click here 📂',
                    sections: [
                        {
                            title: `𝐒𝐔𝐋𝐀-𝐌𝐃`,
                            highlight_label: '',
                            rows: [
                                {
                                    title: 'MENU 📂',
                                    description: '𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳',
                                    id: `${prefix}menu`,
                                },
                                {
                                    title: 'OWNER 🍁',
                                    description: '𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳',
                                    id: `${prefix}owner`,
                                },
                                {
                                    title: 'PING 🫆',
                                    description: '𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳',
                                    id: `${prefix}ping`,
                                },
                                {
                                    title: 'SYSTEM 🌐',
                                    description: '𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳',
                                    id: `${prefix}system`,
                                },
                                {
                                    title: 'REPO 📌',
                                    description: '𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳',
                                    id: `${prefix}repo`,
                                },
                            ],
                        },
                    ],
                }),
            }
        }
    ],
    headerType: 1,
    viewOnce: true,
    image: { url: "https://i.ibb.co/jkmjpkMb/SulaMd.jpg" },
    caption: des,
}, { quoted: fakeQuoted });

      await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/9ow13m.mp3' }, // Audio URL
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });
        
    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        reply('❌ An error occurred while processing your request.');
    }
});