const { BufferJSON, WA_DEFAULT_EPHEMERAL,updateProfilePicturePrivacy, generateWAMessageFromContent, proto, getBinaryNodeChildren, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, downloadContentFromMessage} = require('@whiskeysockets/baileys');
const { cmd, commands } = require("../lib/command");
const {
  GDriveDl,
  mediafireDl,
  getBuffer,
  getGroupAdmins,
  getRandom,
  getimage,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  Func,
  fetchJson
} = require("../lib/functions");
const config = require('../settings'); // Ensure your API key is in config
const fetch = require("node-fetch");
const yts = require("yt-search");
const axios = require('axios');
const cheerio = require("cheerio");
const { igdl } = require("ruhend-scraper");
const apilink = 'https://www.dark-yasiya-api.site' // API LINK ( DO NOT CHANGE THIS!! )


const tiktokCommand = {
  pattern: "ts",
  alias: ["tiktoks", "tiks"],
  desc: "Search TikTok videos",
  use: "tiktoksearch",
  category: "search",
  use: ".ts <query>",
  react: '📱',
  filename: __filename
};

cmd(tiktokCommand, async (sendMessage, message, args, context) => {
  const { from, quoted, body, isCmd, command, args: commandArgs, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply } = context;

  const promptMessage = { text: "[❗] What do you want to search on TikTok?" };
  const quotedMessage = { quoted: message };

  if (!q) {
    return sendMessage(from, promptMessage, quotedMessage);
  }

  try {
    let searchResult = await tiktokSearch(q);
    if (!searchResult.status) {
      throw new Error(searchResult.result);
    }
    let results = searchResult.result;
    shuffleArray(results);
    let topResults = results.slice(0, 7);
    let videoMessages = await Promise.all(topResults.map(video => createVideoMessage(video.videoUrl, sendMessage)));

    const headerMessage = { text: '' };
    const footerMessage = { text: "> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟" };
    const buttonOptions = { buttons: [] };

    let interactiveMessages = videoMessages.map((videoMessage, index) => ({
      body: proto.Message.InteractiveMessage.Body.fromObject(headerMessage),
      footer: proto.Message.InteractiveMessage.Footer.fromObject(footerMessage),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: topResults[index].description,
        hasMediaAttachment: true,
        videoMessage: videoMessage
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(buttonOptions)
    }));

    const deviceListMetadata = { deviceListMetadata: {}, deviceListMetadataVersion: 2 };
    const bodyMessage = { text: "*< 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝐁𝐄𝐓𝐀 TIKTOK SEARCH >*\n\n🔎 *Searched text:* " + q + "\n\n📝 *Results obtained:*" };
    const footerText = { text: '' };
    const headerNoMedia = { hasMediaAttachment: false };
    const carouselMessages = { cards: interactiveMessages };
    const quotedReply = { quoted: message };

    const finalMessage = generateWAMessageFromContent(from, {
      viewOnceMessage: {
        message: {
          messageContextInfo: deviceListMetadata,
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create(bodyMessage),
            footer: proto.Message.InteractiveMessage.Footer.create(footerText),
            header: proto.Message.InteractiveMessage.Header.create(headerNoMedia),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject(carouselMessages)
          })
        }
      }
    }, quotedReply);

    await sendMessage.relayMessage(from, finalMessage.message, { messageId: finalMessage.key.id });
  } catch (error) {
    const errorMessage = { quoted: message };
    await sendMessage(from, { text: error.toString() }, errorMessage);
  }
});

async function tiktokSearch(query) {
  try {
    const searchParams = new URLSearchParams({
      keywords: query,
      count: '10',
      cursor: '0',
      HD: '1'
    });

    const response = await axios.post("https://tikwm.com/api/feed/search", searchParams, {
      headers: {
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8",
        'Cookie': "current_language=en",
        'User-Agent': "Mozilla/5.0 (Linux Android 10 K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
      }
    });

    const videos = response.data.data.videos;

    if (videos.length === 0) {
      return { status: false, result: "No videos found." };
    }

    return {
      status: true,
      result: videos.map(video => ({
        description: video.title ? video.title : "No description",
        videoUrl: video.play ? video.play : "No URL"
      }))
    };
  } catch (error) {
    return { status: false, result: error.message };
  }
}

async function createVideoMessage(videoUrl, sendMessage) {
  try {
    const response = await axios.get(videoUrl, { responseType: "arraybuffer" });
    const videoData = response.data;

    const videoContent = { video: videoData };
    const uploadOptions = { upload: sendMessage.waUploadToServer };

    const { videoMessage } = await generateWAMessageContent(videoContent, uploadOptions);
    return videoMessage;
  } catch (error) {
    throw new Error("Error creating video message: " + error.message);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


cmd({
    pattern: "ytsearch",
    desc: "button test",
    react: "🎵",
    category: "search",
    use: ".ytsearch",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
    if (!q) return reply(`*Need title*`);
        let search = await yts(q);
        let videos = search.all;
        console.log(videos)
        if (!videos || videos.length === 0) {
          reply('No video found');
          return;
        }
        // Choose between 1 and 5 videos at random
        const numVideos = Math.min(videos.length, Math.floor(Math.random() * 10) + 1);
        const selectedVideos = [];
        while (selectedVideos.length < numVideos) {
          const randomIndex = Math.floor(Math.random() * videos.length);
          const randomVideo = videos.splice(randomIndex, 1)[0]; // Avoid selecting the same videos
          selectedVideos.push(randomVideo);
        }
        let push = [];
        for (let i = 0; i < selectedVideos.length; i++) {
          let video = selectedVideos[i];
          let cap = `Title : ${video.title}`;
          let foot = `‼️𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 ❤️‍🩹`;
          const mediaMessage = await prepareWAMessageMedia({ image: { url: video.thumbnail } }, { upload: conn.waUploadToServer });
          push.push({
            body: proto.Message.InteractiveMessage.Body.fromObject({
              text: cap
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
              text: foot
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              title: `Video ${i + 1}`,
              subtitle: '',
              hasMediaAttachment: true,
              ...mediaMessage
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
              buttons: [
                {
                  "name": "cta_copy",
                  "buttonParamsJson": `{"display_text":"Copy Url","id":"1234","copy_code":"${video.url}"}`
                }
              ]
            })
          });
        }
        let sadee = `𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃`;
        let foot2 = `© ᴅᴇᴠᴇʟᴏᴘ ʙʏ ɴɪᴘᴜɴ ʜᴀʀꜱʜᴀɴᴀ`;
        const msg = generateWAMessageFromContent(from, {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2
              },
              interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                body: proto.Message.InteractiveMessage.Body.create({
                  text: sadee
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  text: foot2
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                  hasMediaAttachment: false
                }),
                carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                  cards: push
                }),
                contextInfo: {
                      mentionedJid: ['94727319036@s.whatsapp.net'], 
                      forwardingScore: 999,
                      isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                      newsletterJid: '120363292101892024@newsletter',
                      newsletterName: '‼️𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 ❤️‍🩹',
                      serverMessageId: 999
                    }
                    }
              })
            }
          }
        }, {quoted:mek});
        await conn.relayMessage(from, msg.message, {
          messageId: msg.key.id
        });
    console.log('Button Send Sucsses');
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
})