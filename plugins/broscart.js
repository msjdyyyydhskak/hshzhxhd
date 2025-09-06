
const { cmd } = require('../lib/command');

cmd({
  pattern: "broadcast",
  react: "🫤",
  desc: "Broadcast a message to all groups.",
  category: "owner",
  filename: __filename
}, 
async (conn, mek, m, { isOwner, args, reply }) => {
  try {
    // Owner check
    if (!isOwner) {
      return reply("❌ You are not the owner!");
    }

    // Message check
    if (!args || args.length === 0) {
      return reply("📢 Please provide a message to broadcast.\n\nUsage: !broadcast Hello everyone!");
    }

    const message = args.join(" ");

    // Fetch all groups
    const groups = await conn.groupFetchAllParticipating();
    const groupIds = Object.keys(groups);

    if (groupIds.length === 0) {
      return reply("⚠️ No active groups found.");
    }

    reply(`📢 Broadcasting message to ${groupIds.length} groups...`);

    // Broadcast loop
    for (const groupId of groupIds) {
      try {
        await conn.sendMessage(groupId, { text: message }, { quoted: mek });
      } catch (err) {
        console.log(`❌ Failed to send to ${groupId}: ${err.message}`);
      }
    }

    // Done
    reply("✅ Broadcast completed successfully.");
  } catch (e) {
    console.error(e);
    return reply(`❌ *An error occurred while broadcasting.*\n\n_Error:_ ${e.message}`);
  }
});