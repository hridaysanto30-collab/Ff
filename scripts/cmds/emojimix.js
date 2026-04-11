const axios = require("axios");

module.exports = {
  config: {
    name: "emojimix",
    version: "3.0",
    author: "ChatGPT",
    countDown: 5,
    role: 0,
    description: "Mix two emojis into one image",
    category: "fun"
  },

  onStart: async function ({ message, args }) {
    const [e1, e2] = args;

    if (!e1 || !e2) {
      return message.reply("🤣 🥰");
    }

    if (e1 === e2) {
      return message.reply("🫤😯");
    }

    try {
      const img = await fetchMix(e1, e2);

      if (!img) {
        return message.reply("🤦‍♂️😦");
      }

      return message.reply({
        body: `✨ Emoji Mix Ready: ${e1} + ${e2}`,
        attachment: img
      });

    } catch (err) {
      console.log(err);
      return message.reply("⚠️ Server error, পরে আবার চেষ্টা করো");
    }
  }
};

async function fetchMix(e1, e2) {
  const urls = [
    "https://goatbotserver.onrender.com/taoanhdep/emojimix",
    "https://api.popcat.xyz/emojimix"
  ];

  for (let url of urls) {
    try {
      const res = await axios.get(url, {
        params: { emoji1: e1, emoji2: e2 },
        responseType: "arraybuffer",
        timeout: 10000
      });

      return Buffer.from(res.data, "binary");

    } catch (e) {
      // try next API
    }
  }

  return null;
}
