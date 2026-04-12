module.exports = {
  config: {
    name: "godfunny3",
    version: "3.0.0",
    author: "ChatGPT Edit",
    countDown: 2,
    role: 0,
    shortDescription: "😆 Smart Funny Auto Reply V3",
    category: "fun"
  },

  onChat: async function ({ event, api }) {
    const msg = (event.body || "").toLowerCase();

    // ===== Smart Reply Bank =====
    const data = [
      {
        keys: ["hi", "hello", "hey"],
        replies: [
          "ওই হ্যালো না, সালাম দে আগে 😏",
          "কি খবর boss 😎",
          "আবার আইছোস? নেট ফ্রি নাকি 😂"
        ]
      },
      {
        keys: ["kire", "ki re", "kiree"],
        replies: [
          "কিরে মানে কি সমস্যা 😆",
          "ডাকছোস কেন ভাই? টাকা দিবি? 💸",
          "আমি ব্যস্ত মানুষ 😏"
        ]
      },
      {
        keys: ["love", "valobashi"],
        replies: [
          "ভালোবাসা না, ডাটা প্যাক দে 😎",
          "এইসব আমার ডাটাবেসে নাই 😂",
          "Love error 404 😏"
        ]
      },
      {
        keys: ["bot", "ai"],
        replies: [
          "আমি God Bot 😎🔥",
          "AI না, আমি কিং 👑",
          "আমাকে হালকা নিস না 😂"
        ]
      },
      {
        keys: ["time", "koto", "baje"],
        replies: [
          `এখন সময় ⏰: ${new Date().toLocaleTimeString()}`,
          "সময় দেখতে ঘড়ি লাগে ভাই 😆",
          "সময় জানি, কিন্তু বলবো না 😏"
        ]
      },
      {
        keys: ["boring"],
        replies: [
          "বোরিং লাগলে ঘুম দে 😴",
          "চা খেয়ে আস ☕😆",
          "আমি তো entertainment দিচ্ছি 😎"
        ]
      },
      {
        keys: ["admin", "owner"],
        replies: [
          "Admin কে disturb করিস না 😏",
          "Owner busy 😎",
          "Respect দে boss 👑"
        ]
      }
    ];

    // ===== Match Logic =====
    for (const item of data) {
      if (item.keys.some(k => msg.includes(k))) {
        const reply =
          item.replies[Math.floor(Math.random() * item.replies.length)];

        return api.sendMessage(reply, event.threadID, event.messageID);
      }
    }
  }
};
