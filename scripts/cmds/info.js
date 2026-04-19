module.exports.config = {
    name: "info",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "God Bot Builder",
    description: "User Info Stylish Profile Card",
    commandCategory: "info",
    usages: "info",
    cooldowns: 5
};

module.exports.run = async function ({ api, event }) {

    const msg = `
┣━━━━━━━━━━━━━━━┫
┃
┃—͟͟͞͞─
┃
┣━━━━━━━━━━━━━━━┫
┃
┃👤 𝐍𝐚𝐦𝐞          〲 ꀍꏂꀤꀷꍏꌩ ꀍꍏꌚꌚꍏꈤ
┃
┃🖼️ 𝐏𝐡𝐨𝐭𝐨       〲 Stylish Admin (Auto Show Supported)
┃
┣━━━━━━━━━━━━━━━┫
┃
┃🔥 𝐍𝐢𝐜𝐤 𝐍𝐚𝐦𝐞 〲 s̲h̲o̲n̲t̲o̲
┃
┃🚹 𝐆𝐞𝐧𝐝𝐞𝐫     〲 𝐌𝐀𝐋𝐄
┃
┃😈 𝐀𝐭𝐭𝐢𝐭𝐮𝐝𝐞   〲 𝐊𝐈𝐍𝐆 👑
┃
┣━━━━━━━━━━━━━━━┫
┃
┃🎮 𝐆𝐚𝐦𝐞        〲 𝐅𝐑𝐄𝐄 𝐅𝐈𝐑𝐄 ❤️
┃
┃🎓 𝐒𝐭𝐮𝐝𝐲       〲 𝕡𝕣𝕣𝕓𝕒𝕤𝕚 🥲
┃
┃💰 𝐖𝐨𝐫𝐤       〲 𝐂𝐎𝐍𝐓𝐑𝐀𝐂𝐓𝐈𝐎𝐍
┃
┣━━━━━━━━━━━━━━━┫
┃
┃❤️ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧 〲 𝐒𝐈𝐍𝐆𝐋𝐄 😎
┃
┃🎂 𝐀𝐠𝐞        〲 22+
┃
┃🎉 𝐁𝐢𝐫𝐭𝐡𝐝𝐚𝐲 〲 24 APRIL 🎂
┃
┣━━━━━━━━━━━━━━━┫
┃
┃🩸 𝐁𝐥𝐨𝐨𝐝     〲 A+
┃
┃📏 𝐇𝐞𝐢𝐠𝐡𝐭    〲 5'6"
┃
┃⚖️ 𝐖𝐞𝐢𝐠𝐡𝐭    〲 54+ KG
┃
┣━━━━━━━━━━━━━━━┫
┃
┃🕌 𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧 〲 ISLAM ☪️
┃
┃🏡 𝐀𝐝𝐝𝐫𝐞𝐬𝐬 〲 Bogura 🌍
┃
┣━━━━━━━━━━━━━━━┫
┃
┃🌐 𝐌𝐞𝐬𝐬𝐞𝐧𝐠𝐞𝐫 ❯ mrjuwel 2020
┃
┃🌐 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 ❯ https://www.facebook.com/share/1E299MzHco/
┃
┃🌐 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 ❯ +601116710390
┃
┃🌐 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 ❯ m.me/j/AbbDv4dJZVcKj6b1/
┃
┃🌐 𝐓𝐢𝐤𝐓𝐨𝐤 ❯ মালয়েশিয়া সিঙ্গেল বয়
┃
┃🌐 𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦 ❯ mrjuwel2025
┃
┃🌐 𝐄𝐦𝐚𝐢𝐥 ❯ hridaysanto30@gmail.com
┃
┣━━━━━━━━━━━━━━━┫
┃
┃🕒 𝐔𝐩𝐝𝐚𝐭𝐞𝐝 〲 17/04/2026 ⏰
┃
┣━━━━━━━━━━━━━━━┫
┃
┃💬 𝐒𝐭𝐚𝐭𝐮𝐬 ❯ 😎 Single But Not Available 🔥
┃
┃💎 𝐓𝐢𝐭𝐥𝐞 ❯ King Of Attitude 👑
┃
┣━━━━━━━━━━━━━━━┫
`;

    return api.sendMessage(msg, event.threadID, event.messageID);
};
