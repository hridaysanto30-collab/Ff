const { getStreamsFromAttachment } = global.utils;
const mediaTypes = ["photo", "png", "animated_image", "video", "audio"];

module.exports = {
  config: {
    name: "bridge",
    aliases: ["br"],
    version: "20.0.0",
    author: "Milon Hasan",
    countDown: 1,
    role: 0,
    shortDescription: "Ultra Fast Bridge with Full Group List",
    category: "Communication",
    guide: { en: "{pn} list | Reply with [Number] [Message]" }
  },

  onStart: async function ({ api, event, args, message }) {
    const { threadID } = event;

    // --- 1. SHOW FULL GROUP LIST (ULTRA FAST) ---
    if (args[0] === "list") {
      try {
        // Increased limit to 500 to ensure all groups are fetched
        const list = await api.getThreadList(500, null, ["INBOX"]);
        let msg = "┏━━━━━━❰ 🏢 GROUP LIST ❱━━━━━━┓\n\n";
        let count = 1;
        const groupData = [];

        for (const item of list) {
          if (item.isGroup && item.threadID !== threadID) {
            msg += `${count}. 🏷️ ${item.name || "Unnamed Group"}\n\n`;
            groupData.push({
              index: count,
              threadID: item.threadID
            });
            count++;
          }
        }

        if (count === 1) return message.reply("❌ No other groups found!");

        msg += "┗━━━━━━━━━━━━━━━━━━━━━━┛\n💡 Reply with '[Number] [Message]' to connect.";
        
        return message.reply(msg, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: "listReply",
            groupData: groupData,
            messageID: info.messageID
          });
        });
      } catch (err) {
        return message.reply("❌ Error: Failed to fetch group list quickly.");
      }
    }
    
    return message.reply("⚠️ Use '.bridge list' to see all available groups.");
  },

/* --- [ 🔐 INTERNAL_SECURE_METADATA ] ---
 * 🤖 BOT NAME: MILON BOT
 * 👤 OWNER: MILON HASAN
 * 🔗 FACEBOOK: https://www.facebook.com/share/17uGq8qVZ9/
 * 📞 WHATSAPP: +880 1912603270
 * 📍 LOCATION: NARAYANGANJ, BD
 * --------------------------------------- */

  onReply: async function ({ api, event, Reply, usersData, message }) {
    const { threadID, messageID, senderID, body, attachments } = event;
    const senderName = await usersData.getName(senderID);

    // --- CASE 1: Quick Reply to Group List ---
    if (Reply.type === "listReply") {
      const input = body.split(" ");
      const serial = parseInt(input[0]);
      const content = input.slice(1).join(" ");

      const targetGroup = Reply.groupData.find(g => g.index === serial);
      if (!targetGroup) return; 

      if (!content) return message.reply("⚠️ Please enter a message after the number.\nExample: '1 Hello'");

      const formMessage = {
        body: `🔗 Milon connected group admin\n━━━━━━━━━━━━━━━━━━\n👤 From: ${senderName}\n💬 Message: ${content}\n━━━━━━━━━━━━━━━━━━\n(Reply to this message to send back!)`,
        attachment: await getStreamsFromAttachment(attachments.filter(item => mediaTypes.includes(item.type)))
      };

      return api.sendMessage(formMessage, targetGroup.threadID, (err, info) => {
        if (err) return message.reply("❌ Failed to bridge. Bot might be kicked.");
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          type: "bridgeChat",
          targetMessageID: info.messageID,
          backToTID: threadID,
          backToMID: messageID
        });
        message.reply(`✅ Connected! Message sent to group #${serial}`);
      });
    }

    // --- CASE 2: Continuous Bridge Chat ---
    if (Reply.type === "bridgeChat") {
      const sendToTID = (threadID == Reply.backToTID) ? Reply.targetMessageID : Reply.backToTID;
      const replyToMID = (threadID == Reply.backToTID) ? Reply.targetMessageID : Reply.backToMID;

      const formMessage = {
        body: `📩 Bridge Reply from ${senderName}:\n━━━━━━━━━━━━━━━━━━\n${body || "Sent an attachment"}\n━━━━━━━━━━━━━━━━━━\n(Reply to continue)`,
        attachment: await getStreamsFromAttachment(attachments.filter(item => mediaTypes.includes(item.type)))
      };

      try {
        api.sendMessage(formMessage, sendToTID, (err, info) => {
          if (err) return;
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: "bridgeChat",
            targetMessageID: info.messageID,
            backToTID: threadID,
            backToMID: messageID
          });
        }, replyToMID);
        api.setMessageReaction("✅", messageID, () => {}, true);
      } catch (e) {
        console.error(e);
      }
    }
  }
};
