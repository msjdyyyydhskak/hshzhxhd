const { cmd } = require('../lib/command');

cmd({
  pattern: "msgall",
  category: "owner",
  react: "📤",
  desc: "Send inbox message to all group members (bot-only)",
  filename: __filename,
}, async (conn, mek, m, { isGroup, participants, args, reply, sender }) => {
  try {
    const BOT_NUMBER = conn.user.id;

    if (sender !== BOT_NUMBER) return reply("❌ Only the bot owner (bot number) can use this command.");
    if (!isGroup) return reply("⚠️ This command only works in groups.");

    const message = args.join(" ");
    if (!message) return reply("⚠️ Usage: .msgall Your message here");

    reply("📤 Sending message to all group members...");

    const groupMembers = participants.map(p => p.id).filter(id => id !== conn.user.id);

    let success = 0, failed = 0;

    for (const id of groupMembers) {
      try {
        await conn.sendMessage(id, {
          text: `💌 *Message from group:* ${m.chat}\n\n${message}`
        });
        success++;
      } catch (e) {
        failed++;
      }
      await new Promise(res => setTimeout(res, 100)); // short delay
    }

    reply(`✅ Sent to ${success} members.\n❌ Failed for ${failed} members.`);

  } catch (err) {
    return reply(`❌ Error: ${err.message}`);
  }
});