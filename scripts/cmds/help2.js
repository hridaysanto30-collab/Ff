const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

module.exports = {
  config: {
    name: "help2",
    version: "1.18",
    author: "মালয়েশিয়া সিঙ্গেল  বয়",
    countDown: 5,
    role: 0,
    shortDescription: { en: "View command usage and list all commands directly" },
    longDescription: { en: "View command usage and list all commands directly" },
    category: "info",
    guide: { en: "{pn} / help cmdName" },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const prefix = getPrefix(threadID);

    // New media links
    const mediaLinks = [
      "https://i.imgur.com/suwCtfp.jpeg",
      "https://i.imgur.com/suwCtfp.jpeg",
      "https://i.imgur.com/suwCtfp.jpeg"
    ];

    if (!args[0]) {
      // Group commands by category (use second file's design)
      const categories = {};

      for (const [name, value] of commands) {
        if (!value.config || value.config.role > role) continue;
        const category = (value.config.category || "UNCATEGORIZED").toUpperCase();
        if (!categories[category]) categories[category] = [];
        categories[category].push(name);
      }

      let msg = `╭───────❁\n│✨ মালয়েশিয়া সিঙ্গেল  বয় ✨\n╰────────────❁\n`;

      for (const cat of Object.keys(categories).sort()) {
        msg += `╭─────✰『  🗂️ ${cat} 』\n`;
        for (const c of categories[cat].sort()) {
          msg += `│⚡ ${c}\n`;
        }
        msg += `╰────────────✰\n`;
      }

      const totalCommands = Object.values(categories).reduce((a, b) => a + b.length, 0);
      msg += `╭─────✰[🌟 𝐄𝐍𝐉𝐎𝐘 🌟]\n│> TOTAL COMMANDS: [${totalCommands}]\n│\n│> TYPE: [ ${prefix}HELP <COMMAND> ]\n│\n│> FB.LINK: [https://www.facebook.com/MR.FARHAN.420]\n╰────────────✰\n`;
      msg += `\n╭─────✰\n│ 💖মালয়েশিয়া সিঙ্গেল  বয়💖\n╰────────────✰`; 

      const mediaLink = mediaLinks[Math.floor(Math.random() * mediaLinks.length)];
      const stream = await axios.get(mediaLink, { responseType: "stream" }).then(res => res.data);

      return message.reply({
        body: msg,
        attachment: stream
      });

    } else {
      // Specific command info
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) return message.reply(`Command "${commandName}" not found.`);

      const configCommand = command.config;
      const roleText = roleTextToString(configCommand.role);
      const author = "মালয়েশিয়া সিঙ্গেল  বয়";
      const longDescription = configCommand.longDescription?.en || "No description";
      const guideBody = configCommand.guide?.en || "No guide available.";
      const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

      const response = `
╭───⊙
│ 🔹 Command: ${configCommand.name}
├── INFO
│ 📝 Description: ${longDescription}
│ 👑 Author: ${author}
│ ⚙ Guide: ${usage}
├── USAGE
│ 🔯 Version: ${configCommand.version || "1.0"}
│ ♻ Role: ${roleText}
╰────────────⊙`;

      return message.reply(response);
    }
  },
};

// Helper function to convert role number to string
function roleTextToString(roleText) {
  switch (roleText) {
    case 0: return "0 (All users)";
    case 1: return "1 (Group administrators)";
    case 2: return "2 (Admin bot)";
    default: return "Unknown role";
  }
  }
