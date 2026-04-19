const adminLogThreadID = threadData.data.adminLogThreadID;

if (adminLogThreadID) {
	const avatarURL = `https://graph.facebook.com/${userID}/picture?width=512&height=512`;

	const logText =
`📌 GROUP ACTIVITY LOG

👤 User: ${userName}
🆔 UID: ${userID}
🏠 Group: ${threadName}
⚡ Action: ${type}
⏰ Time: ${hours}:00 (${session})

📍 Thread ID: ${threadID}`;

	const avatarStream = await global.utils.getStreamFromURL(avatarURL);

	api.sendMessage(
		{
			body: logText,
			attachment: avatarStream
		},
		adminLogThreadID
	);
			}
