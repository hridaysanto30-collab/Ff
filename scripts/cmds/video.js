const { GoatWrapper } = require("fca-liane-utils");
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "video",
    version: "1.0.0",
    author: "Custom by ChatGPT",
    countDown: 5,
    role: 0,
    shortDescription: "Download YouTube video",
    category: "media",
    guide: {
      en: "video <name>"
    }
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID, body } = event;

    let query = args.join(" ");
    if (!query && body) {
      query = body.replace(/^video\s+/i, "").trim();
    }

    if (!query) {
      return api.sendMessage(
        "❌ Enter video name\nExample: video Faded",
        threadID,
        messageID
      );
    }

    let loading;

    try {
      // 🔍 Searching
      loading = await api.sendMessage(`🔍 Searching: ${query}`, threadID);

      const search = await axios.get(
        `https://yt-search-milon.vercel.app/search?q=${encodeURIComponent(query)}`
      );

      const video = search.data?.result?.[0];

      if (!video || !video.url) {
        throw new Error("Video not found!");
      }

      await api.unsendMessage(loading.messageID);

      // ⬇️ Downloading
      loading = await api.sendMessage(
        `🎬 ${video.title}\n⏳ Downloading...`,
        threadID
      );

      const dl = await axios.get(
        `https://yt-downloader-milon.vercel.app/dl?url=${video.url}`
      );

      const downloadUrl = dl.data?.url;

      if (!downloadUrl) {
        throw new Error("Download link error!");
      }

      // 📁 Save file
      const filePath = path.join(__dirname, "cache", `video_${Date.now()}.mp4`);
      await fs.ensureDir(path.dirname(filePath));

      const writer = fs.createWriteStream(filePath);
      const stream = await axios({
        url: downloadUrl,
        method: "GET",
        responseType: "stream"
      });

      stream.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      await api.unsendMessage(loading.messageID);

      // 📤 Send video
      await api.sendMessage(
        {
          body:
            `🎬 VIDEO READY\n━━━━━━━━━━━━━━\n` +
            `📖 ${video.title}\n` +
            `⏱ ${video.timestamp || "Unknown"}`,
          attachment: fs.createReadStream(filePath)
        },
        threadID,
        async () => {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        },
        messageID
      );

    } catch (err) {
      if (loading) {
        await api.unsendMessage(loading.messageID).catch(() => {});
      }

      api.sendMessage(
        `❌ Error: ${err.message}`,
        threadID,
        messageID
      );
    }
  }
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
