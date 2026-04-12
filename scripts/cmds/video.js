const axios = require("axios");
const yts = require("yt-search");
const fs = require("fs-extra");
const path = require("path");

const CACHE = __dirname + "/cache/";
if (!fs.existsSync(CACHE)) fs.mkdirSync(CACHE);

// ===== API =====
async function getApi() {
  const res = await axios.get(
    "https://raw.githubusercontent.com/Mostakim0978/D1PT0/main/baseApiUrl.json"
  );
  return res.data.api;
}

// ===== GET ID =====
function getID(url) {
  const reg =
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/))([a-zA-Z0-9_-]{11})/;
  return url.match(reg)?.[1] || null;
}

// ===== DOWNLOAD =====
async function dl(url, file) {
  const writer = fs.createWriteStream(file);
  const res = await axios({ url, method: "GET", responseType: "stream" });
  res.data.pipe(writer);

  return new Promise((ok, err) => {
    writer.on("finish", ok);
    writer.on("error", err);
  });
}

// ===== CONFIG =====
module.exports.config = {
  name: "god",
  version: "4.0.0",
  hasPermssion: 0,
  credits: "ChatGPT ULTRA GOD",
  description: "🔥 All in one video/audio downloader",
  commandCategory: "media",
  usages: "god <name/url> -q 720 / -a",
  cooldowns: 5
};

// ===== RUN =====
module.exports.run = async function ({ api, event, args }) {
  let loading;

  try {
    if (!args[0])
      return api.sendMessage("❌ কিছু লিখ 😑", event.threadID);

    const apiUrl = await getApi();

    // ===== FLAGS =====
    let quality = "720";
    let isAudio = false;

    args.forEach((arg, i) => {
      if (arg === "-q") quality = args[i + 1] || "720";
      if (arg === "-a") isAudio = true;
    });

    // ===== INPUT CLEAN =====
    const query = args
      .filter((x) => !["-q", "-a", "360", "720", "1080"].includes(x))
      .join(" ");

    let videoID;

    // ===== URL =====
    if (query.includes("youtu")) {
      videoID = getID(query);
      if (!videoID)
        return api.sendMessage("❌ ভুল লিংক", event.threadID);
    }

    // ===== SEARCH =====
    else {
      loading = await api.sendMessage(
        `🔍 Searching: ${query}...`,
        event.threadID
      );

      const res = await yts(query);
      if (!res.videos.length)
        return api.sendMessage("❌ কিছু পাই নাই", event.threadID);

      videoID = res.videos[0].videoId;
    }

    // ===== FORMAT =====
    const format = isAudio ? "mp3" : "mp4";

    const { data } = await axios.get(
      `${apiUrl}/ytDl3?link=${videoID}&format=${format}&quality=${quality}`
    );

    if (loading) api.unsendMessage(loading.messageID);

    const { title, downloadLink } = data;

    const safe = title.replace(/[\/\\:*?"<>|]/g, "");
    const file = CACHE + safe + "." + format;

    await dl(downloadLink, file);

    // ===== SEND =====
    await api.sendMessage(
      {
        body:
`╭──〔 💀 GOD V4 〕──╮
🎬 ${title}
🎚 Quality: ${quality}
🎧 Mode: ${isAudio ? "Audio" : "Video"}

⚡ Ultra Fast System
╰──────────────╯`,
        attachment: fs.createReadStream(file)
      },
      event.threadID
    );

    fs.unlinkSync(file);
  } catch (e) {
    if (loading) api.unsendMessage(loading.messageID);
    api.sendMessage("❌ Error: " + e.message, event.threadID);
  }
};
