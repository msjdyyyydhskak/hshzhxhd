const { cmd, commands } = require("../lib/command");

cmd(
  {
    pattern: ".*",
    react: "❌",
    desc: "Fallback handler for unknown commands with image",
    category: "system",
    filename: __filename,
  },
  async (conn, m, mdata, { command, isCmd }) => {
    const knownCommands = Object.keys(commands).map(c => c.toLowerCase());

    if (isCmd && !knownCommands.includes(command.toLowerCase())) {
      const imgUrl = "https://i.ibb.co/7N087ZHh/Queen-Rashu-Md.jpg"; // ඔයා කැමති Image URL එක මෙහි දාන්න

      const message = {
        image: { url: imgUrl },
        caption: `❌ *"${command}"* කියන command එක bot එකට නැහැ!\n\n📝 කරුණාකර *.menu* කියලා command ලයිස්තුව බලන්න.\n\n✨ අපේ bot එකේ commands වලින් එකක් සෙවීමට උත්සාහ කරන්න!`,
      };

      await conn.sendMessage(m.chat, message);
    }
  }
);