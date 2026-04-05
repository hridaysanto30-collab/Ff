module.exports = {
  config: {
    name: "bot2",
    version: "1.0.0",
    author: "Farhan-Khan", // এই নাম চেঞ্জ করলে ফাইল কাজ করবে না
    description: "Complete interactive bot for Messenger",
    role: 0,
    countDown: 0
  },

  onStart: async function() {
    console.log("Bot2 started successfully!");
  },

  run: async function({ event, api }) {
    const msg = event.body ? event.body.toLowerCase() : "";
    const sendReply = (text) => api.sendMessage(text, event.threadID);

    // 💖 ভালোবাসার মেসেজ
    if (["love you bot","love u bot","bot love you","bot love u"].includes(msg)) 
      return sendReply("বস সিয়াম মেয়েদের সাথে কথা বলতে মানা করছে-🙂🤗🐸");

    if (["i love you bot","bot i love you"].includes(msg)) 
      return sendReply("আমাকে না আমার বস সিয়াম কে ভালোবাসো-😻🤗🌺");

    if (["love you","i love you"].includes(msg)) 
      return sendReply("I love you too 🥺! মনে লাগে ঢেউ ভালোবাসে না কেউ hihihi....💦💔");

    // 😡 গালি / ফানি রিপ্লাই
    if (["baler bot","fuck bot"].includes(msg)) 
      return sendReply("কিরে আমাকে গালি দেস কেনো তোকে কিন্তু বেন করে দিমু😠");

    if (["kiss bot","bot kiss me","চুম্মাহ দাও"].includes(msg)) 
      return sendReply("আমি ভালো তুমি পঁচা😌");

    // 📍 অবস্থান / উপস্থিতি
    if (["bot koi"].includes(msg)) return sendReply("এই তো আমি এখানে🙋‍♂️");

    // 🔞 যৌন সম্পর্ক
    if (["/sex","/fuck"].includes(msg)) return sendReply("চিহ্ ভালো হয়ে যাও তোমাকে আমি অনেক সময় দিয়েছি 🤖 ~ now sex time fuck");

    // 🙏 ক্ষমা চাওয়া / ক্ষমা দেওয়া
    if (["opoman korli","biyadobi koros"].includes(msg)) 
      return sendReply("-সরি বস আমার ভূল হইছে-😔-মাফ করে দেন আমাকে ,আর এমন হবে না-🥺🙏");

    // 💔 সিঙ্গেল সম্পর্ক
    if (["single","সিঙ্গেল"].includes(msg)) return sendReply("আমি সিঙ্গেল আছি প্রেম করলে নক দে বলদ!😾");

    // 👍 ইমোজি
    if (["👍","👍🏼"].includes(msg)) 
      return sendReply("-👍-হাত-মেরে কিবোর্ড দুর্বল করো না-🤣👈-ধন্যবাদ-🤗🤝");

    // 👋 কেমন আছো / হ্যালো
    if (["kmon acho","কেমন আছো","kmn aso","kamon aso","কেমন আছো সবাই","kmon aso sobai","kmn aso sobai"].includes(msg)) 
      return sendReply("-আলহামদুলিল্লাহ-🌺-আমি ভালো আছি তুমি কেমন আছো-💝🌻");

    if (["hi","hello","hlw","helo"].includes(msg)) 
      return sendReply("এত হাই-হ্যালো না করে সালাম দিতে কি হয়..!😒");

    // 🤫 চুপ / স্টপ
    if (["বট চুপ","bot tham","স্টপ","stop","চুপ","chup thak"].includes(msg)) 
      return sendReply("-না আমি চুপ থাকবো না-😼-বস সিয়াম আমারে কথা বলতে বলছে-🥱🥷");

    // 💍 জামাই / বউ / gf / bf সম্পর্ক
    if (["bot jamay dau","bot jamay daw","বট জামাই দাও","jamay de","jamay daw bot","jamay dau","জামাই দাউ","জামাই দে বট"].includes(msg)) 
      return sendReply("আমার বস সিয়াম কে চোখে দেখো না নাকি__😒🥱");

    if (["bow daw","bow dau","bow de","বউ দাউ","বউ দে","bot bow daw","bot bow dau","bow dau bot","Bow dau bot","Bow daw bot"].includes(msg)) 
      return sendReply("যেখানে আমার BOSS সিয়াম সিংগেল,😼 সেখানে তোগু বউ দিয়া তো বিলাসিতা,😤 সর সাইডে চাপ, 😼🔪😤");

    if (["gf daw bot","bf daw bot"].includes(msg)) 
      return sendReply("খালি কি তোরাই পেম করবি আমার বস সিয়াম কেউ একটা gf দে<🔪😒");

    // 👤 নাম / পরিচয় সম্পর্ক
    if (["siyam","সিয়াম"].includes(msg)) 
      return sendReply("👉আমার বস♻️ সিয়াম এখন বিজি আছে । তার ইনবক্সে এ মেসেজ দিয়ে রাখো ‎https://www.facebook.com/profile.php?id=61568411310748 ♪√বস ফ্রি হলে আসবে 🧡😁😜🐒");

    
    // 😊 অনুভূতি / রিঅ্যাকশন ইমোজি
    if (["🙂","🙃"].includes(msg)) return sendReply("কি গো কলিজা তোমার কি মন খারাপ🥺");
    if (["😒","🙄"].includes(msg)) return sendReply("এইদিকে ওইদিকে কি দেখো জানু আমি তোমার সামনে দেখো😘");
    if (["😂","😁","😆","🤣","😸","😹"].includes(msg)) return sendReply("ভাই তুই এত হাসিস না হাসলে তোরে চোরের মত লাগে..!🌚🤣");
    if (["🥰","😍","😻","❤️"].includes(msg)) return sendReply("-এত ভালোবাসা কই পাও আমার বস সিয়াম কে একটু দাও-!!😒😌 👉{https://www.facebook.com/profile.php?id=61568411310748");

    // 🕌 সালাম / হেলো
    if (["আসসালামু আলাইকুম","assalamualaikum","assalamu alaikum","salam"].includes(msg)) return sendReply("-ওয়ালাইকুমুস-স
