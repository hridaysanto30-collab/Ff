module.exports = {
  config: {
    name: "leave",
    aliases: ["out", "লিভ"],
    version: "1.3",
    author: "Sandy/fixed Milon + GPT Fix",
    countDown: 5,
    role: 2, 
    shortDescription: "Bot leaves group safely",
    longDescription: "Only admin/owner can make bot leave group",
    category: "owner",
    guide: "{pn} [tid or blank]"
  },

  // Prefix-less safe trigger (ONLY admin)
  onChat: async function ({ api, event, admin }) {
    if (!event.body) return;

    const msg = event.body.toLowerCase().trim();

    if (msg === "leave" || msg === "out" || msg === "bot leave") {

      // 🔐 SAFE CHECK (IMPORTANT)
      const threadInfo = await api.getThreadInfo(event.threadID);
      const isAdmin = threadInfo.adminIDs.some(
        a => a.id === api.getCurrentUserID()
      );

      if (!isAdmin) return;

      return api.sendMessage(
        "আমি গ্রুপ থেকে বের হচ্ছি... ধন্যবাদ সবাইকে 😙",
        event.threadID,
        () => api.removeUserFromGroup(api.getCurrentUserID(), event.threadID)
      );
    }
  },

  // Prefix command version
  onStart: async function ({ api, event, args }) {
    let id = args[0] || event.threadID;

    return api.sendMessage(
      "আমি গ্রুপ থেকে বের হচ্ছি... ধন্যবাদ সবাইকে 😙",
      id,
      () => api.removeUserFromGroup(api.getCurrentUserID(), id)
    );
  }
};
