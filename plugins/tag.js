const { cmd ,commands } = require('../lib/command');
const { exec } = require('child_process');
const config = require('../settings');
const {sleep} = require('../lib/functions')

cmd({
    pattern: "hidetag",
    fromMe: true,  // Only bot owner can use this command
    desc: "Send a message with hidden tags to all group members.",
    category: "group",
    use: ".hidetag <massage >",
    react: "🔍",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, args, q, participants, reply }) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) {
            return await reply("❌ This command can only be used in a group.");
        }
        // Check if a message is provided
        if (!q) {
            return await reply("❗ Please provide a message to send.");
        }
        // Extract group participants' contact IDs
        const participantIds = participants.map((participant) => participant.id);
        // Send the message with hidden tags
        await conn.sendMessage(from, { 
            text: q, 
            mentions: participantIds 
        });
        console.log("Hidetag message sent to all group members.");
    } catch (e) {
        console.error("Error while sending hidetag message:", e);
        await reply("❗ An error occurred while trying to send the hidetag message.");
    }
});

cmd({
  pattern: "ht",
  alias: [],
  use: ".hidetag <text> or reply to media/text",
  react: "🫣",
  desc: "Send hidden mention to all members",
  category: "group",
  filename: __filename
}, async (conn, m, mek, { participants, reply, args }) => {
  try {
    if (!m.isGroup) return await reply("*This command only works in groups!*");

    const mentionedJids = participants.map(u => u.id);
    let content;

    if (m.quoted) {
      const mime = m.quoted.mimetype || "";
      if (/image|video|audio/.test(mime)) {
        const buffer = await m.quoted.download();
        if (mime.startsWith("image")) {
          content = { image: buffer, mentions: mentionedJids };
        } else if (mime.startsWith("video")) {
          content = { video: buffer, mentions: mentionedJids };
        } else if (mime.startsWith("audio")) {
          content = { audio: buffer, mimetype: 'audio/mp4', ptt: true, mentions: mentionedJids };
        }
      } else {
        const text = m.quoted.text || " ";
        content = { text, mentions: mentionedJids };
      }
    } else if (args.length) {
      const text = args.join(" ");
      content = { text, mentions: mentionedJids };
    } else {
      return await reply("*Please provide a message or reply to one!*");
    }

    await conn.sendMessage(m.chat, content, { quoted: mek });
    await conn.sendMessage(m.chat, { react: { text: '✅', key: mek.key } });

  } catch (e) {
    console.error("hidetag error:", e);
    await reply("*Failed to send hidetag message!*");
    await conn.sendMessage(m.chat, { react: { text: '❌', key: mek.key } });
  }
});
