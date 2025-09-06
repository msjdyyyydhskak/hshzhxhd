const { cmd, commands } = require('../lib/command');
const { fetchJson } = require('../lib/functions');
const domain = `https://bk9.fun`;


      // Facebook-dl

cmd({ 
pattern: "fb",
react:"📥",
 alias: ["facebook"], 
desc: "Download Facebook videos", 
category: "download",
 filename: __filename 
}, async (conn, m, store, { from, quoted, args, q, reply }) => { try { if (!q || !q.startsWith("https://")) { return conn.sendMessage(from, { text: "Need URL" }, { quoted: m }); }

await conn.sendMessage(from, {
  react: { text: '⏳', key: m.key }
});

const response = await fetch(`https://bk9.fun/download/fb?url=${encodeURIComponent(q)}`);
const fbData = await response.json();

if (!fbData.status) {
  return reply("❌ Error fetching the video. Please try again.");
}

const caption = `*🧩 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝐁𝐄𝐓𝐀 FaceBook Dawnloder ......*

●  *🧩 Title:* ${fbData.BK9.title}
●  *📒 Descripition:*  ${fbData.BK9.desc}

+ ┉┉┉┉┉┉┉┉[ 🧩 ]┉┉┉┉┉┉┉┉ +
*DAWNLOAD OPTIONS ⬇️*
+ ┉┉┉┉┉┉┉┉[ 🧩 ]┉┉┉┉┉┉┉┉ +

*| 1️⃣ ❕ SD Dawnload*
*| 2️⃣ ❗ HD Dawnload*

*| 3️⃣  🎧 Audio (SD)*
*| 4️⃣  📄 Document (MP3)*
*| 5️⃣  🎤  Voice Note (PTT)*

*‼️මෝඩයෙක් නොවී උඩින් නම්බර් එකක් සිලෙට් කරනව මැට්ටො 🤭*

> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟`;

const sentMsg = await conn.sendMessage(from, {
  image: { url: fbData.BK9.thumb },
  caption: caption
}, { quoted: m });

const messageID = sentMsg.key.id;

conn.ev.on("messages.upsert", async (msgData) => {
  const receivedMsg = msgData.messages[0];
  if (!receivedMsg.message) return;
  
  const receivedText = receivedMsg.message.conversation || receivedMsg.message.extendedTextMessage?.text;
  const senderID = receivedMsg.key.remoteJid;
  const isReplyToBot = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;
  
  if (isReplyToBot) {
    await conn.sendMessage(senderID, {
      react: { text: '⬇️', key: receivedMsg.key }
    });
    
    switch (receivedText) {
      case "1":
        await conn.sendMessage(senderID, {
          video: { url: fbData.BK9.sd },
          caption: "📥 *❕ 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝐁𝐄𝐓𝐀 SD Video Dawnload ...*"
        }, { quoted: receivedMsg });
        break;

      case "2":
        await conn.sendMessage(senderID, {
          video: { url: fbData.BK9.hd },
          caption: "📥 *❗ 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝐁𝐄𝐓𝐀 HD Video Dawnload ...*"
        }, { quoted: receivedMsg });
        break;

      case "3":
        await conn.sendMessage(senderID, {
          audio: { url: fbData.BK9.sd },
          mimetype: "audio/mpeg"
        }, { quoted: receivedMsg });
        break;

      case "4":
        await conn.sendMessage(senderID, {
          document: { url: fbData.BK9.sd },
          mimetype: "audio/mpeg",
          fileName: "Facebook_Audio.mp3",
          caption: "📥 *🎧 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝐁𝐄𝐓𝐀 Document Dawnload ...*"
        }, { quoted: receivedMsg });
        break;

      case "5":
        await conn.sendMessage(senderID, {
          audio: { url: fbData.BK9.sd },
          mimetype: "audio/mp4",
          ptt: true
        }, { quoted: receivedMsg });
        break;

      default:
        reply("❌ Invalid option! Please reply with 1, 2, 3, 4, or 5.");
    }
  }
});

} catch (error) { console.error("Error:", error); reply("❌ Error fetching the video. Please try again."); } });
