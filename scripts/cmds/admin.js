const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

module.exports = {
  config: {
    name: "admin",
    version: "2.0.0",
    author: "HRIDAY + ChatGPT",
    countDown: 5,
    role: 0,
    description: "Show Admin Full Profile with Image",
    category: "admin",
    usePrefix: false
  },

  onStart: async function ({ message }) {
    try {
      const imgPath = path.join(__dirname, "cache", "admin.jpg");

      // 👉 তোমার ছবির লিংক এখানে বসাও
      const imgUrl = "https://i.imgur.com/your-image.jpg";

      const res = await axios.get(imgUrl, { responseType: "arraybuffer" });
      fs.writeFileSync(imgPath, Buffer.from(res.data, "utf-8"));

      const msg = `
┣━━━━━━━━━━━━━━━┫
┃—͟͟͞͞─⃞⤹🩷 ADMIN GOD BOT 🩷⤸⃞
┣━━━━━━━━━━━━━━━┫

👤 Name: ꀍꏂꀤꀷꍏꌩ ꀍꍏꌚꌚꍏꈤ
🔥 Nickname: shonto
😈 Attitude: KING 👑

🎮 Game: FREE FIRE
💰 Work: CONTRACTOR

❤️ Relation: SINGLE
🎂 Age: 22+
🎉 Birthday: 24 April

🩸 Blood: A+
📏 Height: 5'6"
⚖️ Weight: 54+

🕌 Religion: Islam
🏡 Address: Bogura

🌐 Messenger: mrjuwel 2020
🌐 WhatsApp: +601116710390
🌐 Telegram: mrjuwel2025

💬 Status: Single But Not Available 😎🔥
┣━━━━━━━━━━━━━━━┫
`;

      await message.reply({
        body: msg,
        attachment: fs.createReadStream(imgPath)
      });

      fs.unlinkSync(imgPath);

    } catch (e) {
      console.log(e);
      message.reply("❌ Error showing admin profile!");
    }
  }
};
