module.exports = {
  config: {
    name: "mugri",
    version: "1.0.0",
    author: "ChatGPT Edit",
    countDown: 0,
    role: 0,
    description: "Mugri / Troll Auto Reply 😏🔥",
    category: "fun",
  },

  onStart: async function () {},

  onChat: async function ({ event, api }) {
    const msg = event.body ? event.body.toLowerCase() : "";

    // ===== Mugri Replies =====

    if (msg.includes("hi") || msg.includes("hello")) {
      return api.sendMessage("এই যে 😏 এত ভাব নিচ্ছো কেন?", event.threadID);
    }

    if (msg.includes("kire")) {
      return api.sendMessage("তোরে দেখে তো WiFi-ও কানেক্ট হতে চায় না 🤣", event.threadID);
    }

    if (msg.includes("ki koros")) {
      return api.sendMessage("তোর কথা ভাবতেছি 😌 (মিথ্যা না 😏)", event.threadID);
    }

    if (msg.includes("love")) {
      return api.sendMessage("ভালোবাসা না, আগে আয় আয়নায় মুখ ধুয়ে আয় 😹", event.threadID);
    }

    if (msg.includes("bot")) {
      return api.sendMessage("🤖 হুম আমি বট, কিন্তু তোর থেকে বেশি smart 😎🔥", event.threadID);
    }

    if (msg.includes("admin")) {
      return api.sendMessage("Admin busy, তোরে দেখলে offline যায় 😆", event.threadID);
    }

    if (msg.includes("khanki") || msg.includes("fuck")) {
      return api.sendMessage("🚫 মুখ সামলায়ে কথা বল, না হলে roast শুরু হবে 🔥", event.threadID);
    }

    if (msg.includes("single")) {
      return api.sendMessage("Single না lonely 😏 সত্যি বল!", event.threadID);
    }

    if (msg.includes("gm") || msg.includes("good morning")) {
      return api.sendMessage("🌅 সকাল সকাল নাটক শুরু করছো নাকি? 😆", event.threadID);
    }

    if (msg.includes("gn") || msg.includes("good night")) {
      return api.sendMessage("🌙 ঘুমাও, কাল আবার বকা খাবা 😏", event.threadID);
    }

    // Random Mugri Reply
    const randomReply = [
      "😏 তুই না থাকলে গ্রুপটা শান্ত থাকতো",
      "😂 তোর কথা শুনলে মোবাইলও hang মারে",
      "🔥 attitude কমা, battery low হয়ে যাবে",
      "😆 তুই VIP না, V.I.Pain",
      "😹 তোর logic = 0%",
      "😏 drama king/queen আসছে সবাই সাবধান"
    ];

    if (msg) {
      return api.sendMessage(
        randomReply[Math.floor(Math.random() * randomReply.length)],
        event.threadID
      );
    }
  }
};
