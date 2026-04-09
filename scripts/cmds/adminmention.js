,cmd install adminmention.js const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "adminmention",
    version: "7.1.0",
    author: "Farhan-Khan", // ⚠️ Author change করলে bot বন্ধ হবে
    countDown: 0,
    role: 0,
    shortDescription: "Admin mention reply styled",
    category: "system"
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    // 🔒 AUTHOR LOCK
    if (this.config.author !== "Farhan-Khan") {
      console.log("⚠️ Author changed! Module stopped.");
      return;
    }

    // 👑 ADMINS
    const admins = [
      { uid: "61568411310748", names: ["@তো্ঁমা্ঁগো্ঁ পি্ঁচ্ছি্ঁ উ্ঁদয়্ঁ তা্ঁহ"] },
      { uid: "61568411310748", names: ["সিয়াম ভাই"] }
    ];

    const senderID = String(event.senderID);
    if (admins.some(a => a.uid === senderID)) return; // Ignore admin itself

    const text = (event.body || "").toLowerCase().trim();
    const mentionedIDs = event.mentions ? Object.keys(event.mentions) : [];

    // 🔍 MENTION DETECT
    const isMentioning = admins.some(admin =>
      mentionedIDs.includes(admin.uid) ||
      admin.names.some(name => text.includes(name.toLowerCase()))
    );
    if (!isMentioning) return;

    // 🎬 VIDEO LIST (Imgur direct MP4 links)
    const videos = [
      "https://i.imgur.com/43gtj8Z.mp4",
      "https://i.imgur.com/kTGfdD0.mp4",
      "https://i.imgur.com/wRKo5sb.mp4",
      "https://i.imgur.com/LivwF3W.mp4",
      "https://i.imgur.com/8GdtmE0.mp4"
    ];

    // 💬 RAW CAPTIONS
    const captions = [
      "Mantion_দিস না _সিয়াম বস এর মন মন ভালো নেই আস্কে-!💔🥀",
      "- আমার বস সিয়াম এর সাথে কেউ সেক্স করে না থুক্কু টেক্স করে নাহ🫂💔",
      "👉আমার বস ♻️ 𝑺𝒊𝒚𝒂𝒎  এখন বিজি আছে । তার ইনবক্সে এ মেসেজ দিয়ে রাখো https://www.facebook.com/profile.php?id=61568411310748 🔰 ♪√বস ফ্রি হলে আসবে🧡😁😜🐒",
      "বস সিয়াম কে এত মেনশন না দিয়ে বক্স আসো হট করে দিবো🤷‍ঝাং 😘🥒",
      "বস সিয়াম কে Mantion_দিলে চুম্মাইয়া ঠুটের কালার change কইরা,লামু 💋😾😾🔨",
      "সিয়াম বস এখন বিজি জা বলার আমাকে বলতে পারেন_!!😼🥰",
      "সিয়াম বস কে এতো মেনশন নাহ দিয়া বস কে একটা জি এফ দে 😒 😏",
      "Mantion_না দিয়ে বস সিয়াম এর সাথে সিরিয়াস প্রেম করতে চাইলে ইনবক্স",
      "বস সিয়াম কে মেনশন দিসনা পারলে একটা জি এফ দে",
      "বাল পাকনা Mantion_দিস না বস সিয়াম প্রচুর বিজি আছে 🥵🥀🤐",
      "চুমু খাওয়ার বয়স টা আমার বস সিয়াম চকলেট🍫খেয়ে উড়িয়ে দিল 🤗"
    ];

    const formatCaption = (text) => `
✿•≫───────────────≪•✿
『 ${text} 』
✿•≫───────────────≪•✿
`;

    const rawCaption = captions[Math.floor(Math.random() * captions.length)];
    const styledCaption = formatCaption(rawCaption);
    const videoUrl = videos[Math.floor(Math.random() * videos.length)];

    // Ensure cache folder exists
    const cacheDir = path.join(__dirname, "cache");
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
    const filePath = path.join(cacheDir, `admin_${Date.now()}.mp4`);

    try {
      // ⬇️ Download video as binary
      const res = await axios.get(videoUrl, { responseType: "arraybuffer", timeout: 15000 });
      fs.writeFileSync(filePath, Buffer.from(res.data));

      // 📤 Reply to original message (SMS + Video)
      await message.reply({
        body: styledCaption,
        attachment: fs.createReadStream(filePath)
      });

      // 🧹 Delete cached file
      fs.unlinkSync(filePath);

    } catch (err) {
      console.log("Error sending admin reply:", err);
    }
  }
};
