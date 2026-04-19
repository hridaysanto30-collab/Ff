const fs = require("fs-extra");
const { config } = global.GoatBot;
const { client } = global;

module.exports = {
	config: {
		name: "adminonly",
		aliases: ["adonly", "onlyad", "onlyadmin"],
		version: "2.0",
		author: "siyam ⚡ upgraded",
		countDown: 3,
		role: 2,
		description: {
			en: "Turn on/off admin-only mode with notification control"
		},
		category: "owner"
	},

	langs: {
		en: {
			turnedOn: "🔒 Admin-only mode ENABLED",
			turnedOff: "🔓 Admin-only mode DISABLED",
			turnedOnNoti: "🔔 Admin-only warning notifications ENABLED",
			turnedOffNoti: "🔕 Admin-only warning notifications DISABLED",
			invalid: "⚠️ Use: on / off / noti on / noti off"
		}
	},

	onStart: function ({ args, message, getLang, event }) {
		let mode = args[0];
		let subMode = args[1];

		// NOTI SYSTEM
		if (mode === "noti") {
			if (subMode === "on") {
				config.hideNotiMessage.adminOnly = false;
				message.reply(getLang("turnedOnNoti"));
			} else if (subMode === "off") {
				config.hideNotiMessage.adminOnly = true;
				message.reply(getLang("turnedOffNoti"));
			} else {
				return message.reply(getLang("invalid"));
			}
		}

		// ADMIN ONLY SYSTEM
		else {
			if (mode === "on") {
				config.adminOnly.enable = true;
				message.reply(getLang("turnedOn"));
			} else if (mode === "off") {
				config.adminOnly.enable = false;
				message.reply(getLang("turnedOff"));
			} else {
				return message.reply(getLang("invalid"));
			}
		}

		// SAVE CONFIG SAFELY
		fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
	}
};
