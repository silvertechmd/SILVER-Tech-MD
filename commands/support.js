module.exports = {
  name: "support",
  alias: ["helpbot", "support", "pathanupport"],
  description: "Get SILVER-Tech-bot-v2 support links and contact info",
  category: "general",
  async run({ conn, m }) {
    const caption = `🛠️ *SILVER-TECH-BOT-V2 - SUPPORT CENTER* 🛠️



💬 *WhatsApp Support Group:*  
https://chat.whatsapp.com/JC6FGwfeJL781EnvN82Dfw?mode=wwt

📲 *Telegram Support:*  
https://t.me/@silvermd1

🧑‍💻 *GitHub Repository:*  
https://github.com/silvertechmd/SILVER-Tech-MD

📞 *Bot Admin:*  
wa.me/923106367029

📞 *Bot Owner:*  
wa.me/923106367029

🧠 Use *.menu* to explore commands.
💥 Stay updated and have fun using SILVER-Tech-bot-v2!`;

    await conn.sendMessage(m.chat, {
      text: caption,
      mentions: [m.sender]
    }, { quoted: m });
  }
};
