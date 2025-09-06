const{ cmd, commands } = require('../lib/command');
const {
  proto,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
} = require('@whiskeysockets/baileys');
const os = require("os");

cmd({
  pattern: "menu1",
  react: "📃",
  alias: ["commands"],
  desc: "Get bot's command list.",
  use: '.menu',
  filename: __filename
},
async(conn, mek, m, { from, prefix, quoted, q, reply }) => {
  try {
    let hostname;
    if (os.hostname().length == 12) hostname = 'replit';
    else if (os.hostname().length == 36) hostname = 'heroku';
    else if (os.hostname().length == 8) hostname = 'koyeb';
    else hostname = os.hostname();

    const monspace = '```';
    const monspacenew = '`';
    const cap = `𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝐁𝐄𝐓𝐀`;
    var vajiralod = [
      "LOADING ●●○○○○",
      "LOADING ●●●●○○",
      "LOADING ●●●●●●",
      "`COMPLETED ✅`"
    ];

    let { key } = await conn.sendMessage(from, { text: '' });
    for (let i = 0; i < vajiralod.length; i++) {
      await conn.sendMessage(from, { text: vajiralod[i], edit: key });
    }

    const category = q.trim().toUpperCase();
    let wm = '> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟';

    function buildMenu(cat, title) {
      let menu = `*📃 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝐁𝐄𝐓𝐀 ${category} ${title.toUpperCase()} Command List...*\n\n`;
      for (let i = 0; i < commands.length; i++) {
        if (commands[i].category === cat && !commands[i].dontAddCommandList) {
          menu += `• *${commands[i].pattern}*\n`;
        }
      }
      menu += `\n⭓ Total Commands List ${category}: ${commands.filter(cmd => cmd.category === cat).length}\n\n${wm}`;
      return menu;
    }

    const menus = [
      buildMenu('download', 'download'),
      buildMenu('owner', 'owner'),
      buildMenu('group', 'group'),
      buildMenu('other', 'other'),
      buildMenu('search', 'search'),
      buildMenu('convert', 'convert'),
      buildMenu('main', 'main'),
      buildMenu('bug', 'bug'),
      buildMenu('movie', 'movie'),
      buildMenu('ai', 'ai'),
      buildMenu('wallpapers', 'wallpapers'),
      buildMenu('education', 'education'),
      buildMenu('news', 'news'),
    ];

    const cards = [];
    for (const menu of menus) {
      const preparedMedia = await prepareWAMessageMedia({ image: { url: 'https://i.ibb.co/JRXS2jZD/Queen-Rashu-Md.jpg' } }, { upload: conn.waUploadToServer });
      const card = {
        header: proto.Message.InteractiveMessage.Header.create({
          ...preparedMedia,
          title: menu,
          gifPlayback: true,
          subtitle: "𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝐁𝐄𝐓𝐀 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐋𝐈𝐒𝐓",
          hasMediaAttachment: false
        }),
        body: { text: '' },
        nativeFlowMessage: {}
      };
      cards.push(card);
    }

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: { text: '' },
            carouselMessage: {
              cards,
              messageVersion: 1
            },
            contextInfo: {
              mentionedJid: [m.sender],
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: '120363292101892024@newsletter',
                newsletterName: `‼️𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 ❤️‍🩹`,
                serverMessageId: 143
              }
            }
          }
        }
      }
    }, { quoted: m });

    await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });

  } catch (e) {
    console.log(e);
    reply(`❌ Error occurred in cmdmenu.\n\n${e.message}`);
  }
});