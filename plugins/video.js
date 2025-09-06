const { cmd, commands } = require('../lib/command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive1",
    alias: ["status", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "👋",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
    const sulafQuoted = {
  key: {
    remoteJid: "status@broadcast", 
    fromMe: false,
    id: 'FAKE1234567890', 
    participant: '94727319036@s.whatsapp.net' // fake sender number
  },
  message: {
    conversation: '❤️‍🩹 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝐕2....'
  },
  messageTimestamp: Math.floor(Date.now() / 1000),
  pushName: "RASHU-MD 𝚄𝚂𝙴𝚁",
};
        // Generate system status message
        const status = `*❤️‍🩹🪄🫂 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝐕2 𝐀𝐋𝐈𝐕𝐄 𝐍𝐎𝐖 ...*

*💐 හායි _${pushname}_ කෝමද ඔයාට  👋*

*‼️ 𝚁𝚄𝙽 𝚃𝙸𝙼𝙴 :*
> ${runtime(process.uptime())}
*‼️ 𝚁𝙰𝙼 𝚄𝚂𝙴 :*
> ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB


*𝑰 𝑨𝒎 𝑸𝒖𝒆𝒆𝒏 𝑹𝒂𝒔𝒉𝒖 𝑴𝒅 𝑽2 𝑵𝒆𝒘 𝑼𝒑𝒅𝒂𝒕𝒆.....*

𝑰 𝑨𝒎 𝑫𝒆𝒗𝒆𝒍𝒐𝒑𝒆𝒓 𝑶𝒘𝒏𝒆𝒓 𝑵𝒂𝒎𝒆 𝑩𝒚 𝑵𝒊𝒑𝒖𝒏 𝑯𝒂𝒓𝒔𝒉𝒂𝒏𝒂 𝑺𝒂𝒏𝒅𝒂𝒓𝒖𝒘𝒂𝒏. 

𝑻𝒚𝒑𝒆 𝑴𝒆𝒏𝒖 𝑨𝒍𝒍 𝑪𝒐𝒎𝒎𝒂𝒏𝒅 𝑳𝒊𝒔𝒕
𝑼𝒔𝒆 : .𝒎𝒆𝒏𝒖 
𝑻𝒆𝒔𝒕 𝑩𝒐𝒕 𝑺𝒑𝒆𝒆𝒅 
𝑼𝒔𝒆 : .𝒔𝒑𝒆𝒆𝒅
𝑩𝒐𝒕 𝑶𝒘𝒏𝒆𝒓 𝑪𝒐𝒏𝒕𝒂𝒄𝒕
𝑼𝒔𝒆 : .𝒐𝒘𝒏𝒆𝒓

~💐 I LOVE YOU _*QUEEN RASHU MD V2*_ NEW UPDATE USER~

> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟`;

        // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/cpu3eu.jpg` },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363292101892024@newsletter',
                    newsletterName: '‼️𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝐕2 ❤️‍🩹',
                    serverMessageId: 190
                }
            }
        }, { quoted: sulafQuoted });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
