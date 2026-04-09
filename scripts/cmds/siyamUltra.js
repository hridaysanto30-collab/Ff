const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const cacheDir = path.join(__dirname, "cache", "media");
const stateFile = path.join(__dirname, "cache", "cycle.json");

module.exports = {
  config: {
    name: "siyamUltra", // 🔥 নাম change করা হয়েছে
    version: "8.0.0",
    author: "SIYAM FINAL",
    role: 0,
    shortDescription: "Pic + Video + Voice Cycle Reply",
    category: "system"
  },

  onStart: async function () {
    fs.ensureDirSync(cacheDir);

    if (!fs.existsSync(stateFile)) {
      fs.writeFileSync(stateFile, JSON.stringify({ step: 0 }));
    }
  },

  onChat: async function ({ event, message }) {
    if (!event.body) return;

    // 👉 শুধু মেনশন হলেই কাজ করবে
    if (!event.mentions || Object.keys(event.mentions).length === 0) return;

    // 👥 Mention (UID + Name বসাও)
    const mentionList = [
      { id: "61568411310748", tag: "@তো্ঁমা্ঁগো্ঁ পি্ঁচ্ছি্ঁ উ্ঁদয়্ঁ তা্ঁহ" },
      { id: "61568411310748", tag: "ওই" },
      { id: "61568411310748", tag: "সিয়াম ভাই" },
      { id: "61568411310748", tag: "সিয়াম" }
    ];

    // 🎭 Design Funny Text
    const texts = [
`✿•≫───────────────≪•✿
『 😒 আমার বস সিয়াম এখন বিজি! 』
✿•≫───────────────≪•✿`,

`✿•≫───────────────≪•✿
『 😂 এত মেনশন দিস কেন রে! 』
✿•≫───────────────≪•✿`,

`✿•≫───────────────≪•✿
『 😎 বস সিয়াম ঘুমাইতেছে! 』
✿•≫───────────────≪•✿`,

`✿•≫───────────────≪•✿
『 🙄 সিয়াম বস তোকে পাত্তা দেয় না! 』
✿•≫───────────────≪•✿`,

`✿•≫───────────────≪•✿
『 😆 বস পালাইয়া যাবে এত ডাকলে! 』
✿•≫───────────────≪•✿`,

`✿•≫───────────────≪•✿
『 🤧 বস এখন খাইতেছে! 』
✿•≫───────────────≪•✿`
    ];

    // 🖼️ ৮টা Image
    const imageList = [
      "https://files.catbox.moe/65zua8.jpg",
      "https://files.catbox.moe/djqs7u.jpg",
      "https://files.catbox.moe/tml7ny.jpg",
      "https://files.catbox.moe/vjv4j4.jpg",
      "https://files.catbox.moe/viwxe5.jpg",
      "https://files.catbox.moe/jn8hy8.jpg",
      "https://files.catbox.moe/krmyrm.jpg",
      "https://files.catbox.moe/41hfau.jpg"
    ];

    // 🎥 ৬টা Video
    const videoList = [
      "https://files.catbox.moe/0n8gg4.mp4",
      "https://files.catbox.moe/innen9.mp4",
      "https://files.catbox.moe/l3dvcg.mp4",
      "https://files.catbox.moe/k3bmau.mp4",
      "https://files.catbox.moe/m9shpt.mp4",
      "https://files.catbox.moe/5wscmd.mp4"
    ];

    // 🎧 ৬টা Voice (READY)
    const voiceList = [
      "https://files.catbox.moe/pjxs5g.mp4",
      "https://files.catbox.moe/515rkv.mp4",
      "https://files.catbox.moe/wmdaho.mp4",
      "https://files.catbox.moe/khdlld.mp4",
      "https://files.catbox.moe/glp2f4.mp4"
    ];

    // 🔁 Cycle System
    let state = JSON.parse(fs.readFileSync(stateFile));
    let step = state.step;

    const types = ["image", "video", "voice"];
    const current = types[step];

    state.step = (step + 1) % types.length;
    fs.writeFileSync(stateFile, JSON.stringify(state));

    const randomText = texts[Math.floor(Math.random() * texts.length)];

    if (current === "image") {
      return send(message, imageList, randomText, mentionList, ".jpg");
    }

    if (current === "video") {
      return send(message, videoList, randomText, mentionList, ".mp4");
    }

    if (current === "voice") {
      return send(message, voiceList, randomText, mentionList, ".mp4");
    }
  }
};

// 📦 Send Function
async function send(message, list, text, mentionList, ext) {
  const url = list[Math.floor(Math.random() * list.length)];
  const filePath = path.join(cacheDir, `${Date.now()}${ext}`);

  try {
    const res = await axios.get(url, { responseType: "arraybuffer" });
    fs.writeFileSync(filePath, Buffer.from(res.data));

    return message.reply({
      body: `${mentionList.map(u => u.tag).join(" ")}\n\n${text}`,
      attachment: fs.createReadStream(filePath),
      mentions: mentionList
    });

  } catch (err) {
    console.error(err);
  }
}
