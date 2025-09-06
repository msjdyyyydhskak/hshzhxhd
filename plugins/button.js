const { cmd } = require('../lib/command');

cmd({
  pattern: "help ?(.*)",
  category: "general",
  desc: "Get detailed info about any command",
  filename: __filename,
}, async (conn, mek, m, { args, commands, reply }) => {
  try {
    const input = args[0];

    if (!input) {
      return reply("🧾 Usage: .help <command>\nExample: .help menu");
    }

    const command = commands.find(
      (x) => x.pattern?.split(" ")[0].toLowerCase() === input.toLowerCase()
    );

    if (!command) {
      return reply(`❌ Command *${input}* not found.`);
    }

    let helpMsg = `📘 *Command Help*\n\n`;
    helpMsg += `🔹 *Command:* .${command.pattern.split(" ")[0]}\n`;
    helpMsg += `🗂️ *Category:* ${command.category || "N/A"}\n`;
    helpMsg += `📝 *Description:* ${command.desc || "No description provided."}\n`;
    helpMsg += `📁 *Source File:* ${command.filename?.split("/").pop() || "Unknown"}\n`;
    helpMsg += `💡 *Usage:* .${command.pattern.split(" ")[0]} ${command.pattern.includes("?") ? "<args>" : ""}`;

    return reply(helpMsg);

  } catch (err) {
    return reply(`❌ Error: ${err.message}`);
  }
});