const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "notify",
    version: "5.0.2",
    permission: 2,
    credits: "Mahabub (2-way Infinite Reply, Fixed Owner→GC)",
    description: "Send formatted notification to all groups (2-way infinite reply system)",
    prefix: true,
    category: "system",
    usages: "[message]"
  },

  // 🔹 Admin sends notification to all groups
  onStart: async function ({ api, event, args }) {
    const msg = args.join(" ");
    if (!msg) return api.sendMessage("⚠ Please provide a notification message.", event.threadID, event.messageID);

    const content =
`🔔 ɴᴏᴛɪꜰɪᴄᴀᴛɪᴏɴ ꜰʀᴏᴍ sɪʏᴀᴍ ʜᴀsᴀɴ 🎀
━━━━━━━━━━━━
💬 ᴍᴇꜱꜱᴀɢᴇ ʙʏ: sɪʏᴀᴍ ʜᴀsᴀɴ 🐢 (ᴏᴡɴᴇʀ)

📝 [ ${msg} ]🧸

━━━━━━━━━━━━━━━━━━━━
⚠ ʀᴇᴘʟʏ ᴛʜɪs ᴍsɢ ᴛᴏ sᴇɴᴅ ᴍsɢ ᴛᴏ ᴏᴡɴᴇʀ..!`;

    try {
      const threads = await api.getThreadList(100, null, ["INBOX"]);
      const groups = threads.filter(t => t.isGroup);

      let sent = 0, failed = 0;

      for (const g of groups) {
        try {
          const sentMsg = await api.sendMessage(content, g.threadID);

          // track reply from group → owner
          global.GoatBot.onReply.set(sentMsg.messageID, {
            commandName: this.config.name,
            type: "gcToOwner",
            groupID: g.threadID
          });

          sent++;
        } catch {
          failed++;
        }
      }

      return api.sendMessage(`✅ Sent to ${sent} groups. ❌ Failed: ${failed}`, event.threadID, event.messageID);
    } catch (e) {
      return api.sendMessage("❌ Error: " + e.message, event.threadID, event.messageID);
    }
  },

  // 🔹 Handle replies
  onReply: async function ({ api, event, Reply }) {
    const { body, attachments, threadID, senderID } = event;
    const ownerID = "61586540721576"; // 🔹 replace with your FB UID

    // --- Case 1: Group → Owner
    if (Reply.type === "gcToOwner") {
      const userInfo = await api.getUserInfo(senderID);
      const name = userInfo[senderID]?.name || "Unknown";

      let forwardMsg =
`📩 Reply on your notification
━━━━━━━━━━━━
👤 From: ${name} (${senderID})
💬 Message: ${body || "[Attachment]"}
➡ Group Thread ID: ${threadID}`;

      const files = await downloadAll(attachments);

      // send only to owner
      const sentAdminMsg = await api.sendMessage(
        { body: forwardMsg, attachment: files },
        ownerID,
        () => cleanup(files)
      );

      // track owner reply → GC
      global.GoatBot.onReply.set(sentAdminMsg.messageID, {
        commandName: this.config.name,
        type: "ownerToGC",
        groupID: threadID
      });
    }

    // --- Case 2: Owner → Group
    else if (Reply.type === "ownerToGC") {
      const replyMsg =
`📩 Message from owner
━━━━━━━━━━━━
💬 ${body || "[Attachment]"}`;

      const files = await downloadAll(attachments);

      const sentMsg = await api.sendMessage(
        { body: replyMsg, attachment: files },
        Reply.groupID,
        () => cleanup(files)
      );

      // track GC reply again → Owner
      global.GoatBot.onReply.set(sentMsg.messageID, {
        commandName: this.config.name,
        type: "gcToOwner",
        groupID: Reply.groupID
      });
    }
  }
};

// 🔹 download helper
async function downloadAll(attachments) {
  if (!attachments?.length) return [];
  let files = [];
  for (const att of attachments) {
    try {
      let ext = "dat";
      if (att.type === "photo") ext = "jpg";
      if (att.type === "video") ext = "mp4";
      if (att.type === "audio") ext = "mp3";
      if (att.type === "animated_image") ext = "gif";
      const file = await downloadFile(att.url, ext);
      files.push(file);
    } catch (e) {
      console.error("Attachment failed:", e.message);
    }
  }
  return files;
}

async function downloadFile(url, ext) {
  const filePath = path.join(__dirname, `cache_${Date.now()}.${ext}`);
  const res = await axios.get(url, { responseType: "arraybuffer" });
  fs.writeFileSync(filePath, Buffer.from(res.data, "binary"));
  const stream = fs.createReadStream(filePath);
  stream.path = filePath;
  return stream;
}

function cleanup(files) {
  files.forEach(f => { try { fs.unlinkSync(f.path); } catch {} });
                                              }
