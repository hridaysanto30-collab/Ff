const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "voice",
    version: "1.0.0",
    author: "Hriday Hasan Shanto",
    countDown: 3,
    role: 0,
    shortDescription: "Text to voice system",
    category: "utility",
    usePrefix: false
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    const body = event.body || "";

    if (!body.toLowerCase().startsWith("voice ")) return;

    const text = body.slice(6).trim();
    if (!text) return message.reply("🎤 কিছু লিখো যা voice এ convert হবে!");

    try {
      const cacheDir = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

      const filePath = path.join(cacheDir, `voice_${Date.now()}.mp3`);

      // 🌐 Free TTS API
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(text)}`;

      const res = await axios.get(url, {
        responseType: "arraybuffer"
      });

      fs.writeFileSync(filePath, Buffer.from(res.data));

      await message.reply({
        body: `🎤 Voice by Hriday • Hasan • Shanto\n\n📝 Text: ${text}`,
        attachment: fs.createReadStream(filePath)
      });

      fs.unlinkSync(filePath);

    } catch (e) {
      console.log(e);
      message.reply("❌ Voice তৈরি করা যায়নি!");
    }
  }
};
