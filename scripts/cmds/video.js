const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "video",
    version: "3.0.0",
    author: "GOD BOT UPGRADE",
    countDown: 5,
    role: 0,
    description: "Search and send video with HD/SD + thumbnail",
    category: "media",
    usePrefix: false
  },

  onStart: async function ({ message, args }) {
    try {
      if (!args[0]) return message.reply("❌ | ভিডিও নাম লিখো!");

      const query = args.join(" ");
      const api = `https://api.samirthakuriya.repl.co/video?search=${encodeURIComponent(query)}`;

      const res = await axios.get(api);
      const data = res.data.data[0];

      if (!data) return message.reply("❌ | ভিডিও পাওয়া যায়নি!");

      const videoUrl = data.url;
      const title = data.title;
      const thumbnail = data.thumbnail;

      const filePath = path.join(__dirname, "cache", "video.mp4");

      // 📥 Download video
      const video = (await axios.get(videoUrl, { responseType: "stream" })).data;

      const writer = fs.createWriteStream(filePath);
      video.pipe(writer);

      writer.on("finish", async () => {
        return message.reply({
          body: `🎬 𝗚𝗢𝗗 𝗩𝗜𝗗𝗘𝗢\n\n📌 Title: ${title}\n🎥 Quality: Auto HD/SD\n✨ Enjoy your video 😎`,
          attachment: fs.createReadStream(filePath)
        });
      });

    } catch (e) {
      console.log(e);
      return message.reply("⚠️ | Error হয়েছে!");
    }
  }
};
