const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const jimp = require("jimp");

module.exports.config = {
    name: "sala",
    version: "3.0.0",
    hasPermssion: 0,
    credits: "🔰 hriday + GOD FIX🔰",
    description: "Ultra God Sala bonding system",
    commandCategory: "love",
    usages: "reply/mention",
    cooldowns: 3
};

// ===== LOAD BG =====
module.exports.onLoad = async () => {
    const dir = __dirname + "/cache/sala";
    const bg = dir + "/bg.jpg";

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    if (!fs.existsSync(bg)) {
        const res = await axios.get(
            "https://i.postimg.cc/jdp17LNv/IMG-6498.jpg",
            { responseType: "arraybuffer" }
        );
        fs.writeFileSync(bg, res.data);
    }
};

// ===== IMAGE MAKER GOD LEVEL =====
async function buildImage(uid1, uid2) {
    const dir = __dirname + "/cache/sala";
    const bg = await jimp.read(dir + "/bg.jpg");

    const p1 = dir + "/1.png";
    const p2 = dir + "/2.png";
    const out = dir + "/out.png";

    const getAv = async (uid) =>
        (await axios.get(
            `https://graph.facebook.com/${uid}/picture?width=512&height=512`,
            { responseType: "arraybuffer" }
        )).data;

    fs.writeFileSync(p1, await getAv(uid1));
    fs.writeFileSync(p2, await getAv(uid2));

    const img1 = await jimp.read(p1);
    const img2 = await jimp.read(p2);

    img1.circle();
    img2.circle();

    bg.resize(500, 300)
        .composite(img1.resize(85, 85), 120, 110)
        .composite(img2.resize(85, 85), 310, 110);

    const buffer = await bg.getBufferAsync("image/png");
    fs.writeFileSync(out, buffer);

    fs.removeSync(p1);
    fs.removeSync(p2);

    return out;
}

// ===== MAIN RUN =====
module.exports.run = async function ({ event, api }) {
    const { threadID, messageID, senderID } = event;

    let targetID = null;

    // reply method
    if (event.messageReply) {
        targetID = event.messageReply.senderID;
    }

    // mention method
    else if (Object.keys(event.mentions || {}).length > 0) {
        targetID = Object.keys(event.mentions)[0];
    }

    if (!targetID) {
        return api.sendMessage(
            "❌ কাউকে mention বা reply করো!",
            threadID,
            messageID
        );
    }

    if (targetID === senderID) {
        return api.sendMessage(
            "😆 নিজের সাথে সালা বানানো যাবে না!",
            threadID,
            messageID
        );
    }

    // safe user info
    let name1 = "User";
    let name2 = "User";

    try {
        const info = await api.getUserInfo([senderID, targetID]);
        name1 = info[senderID]?.name || "User1";
        name2 = info[targetID]?.name || "User2";
    } catch (e) {}

    const msgs = [
        `😏 ${name1} ❤️ ${name2} = SALA BOND`,
        `🔥 নতুন সালা কনেকশন তৈরি হয়েছে!`,
        `👬 Friendship Level MAX 💯`,
        `😂 আজ থেকে অফিসিয়ালি সালা-বন্ধু!`
    ];

    try {
        const imgPath = await buildImage(senderID, targetID);

        return api.sendMessage(
            {
                body: msgs[Math.floor(Math.random() * msgs.length)],
                attachment: fs.createReadStream(imgPath)
            },
            threadID,
            () => fs.removeSync(imgPath),
            messageID
        );
    } catch (err) {
        console.log(err);
        return api.sendMessage(
            "❌ God File error fix needed!",
            threadID,
            messageID
        );
    }
};
