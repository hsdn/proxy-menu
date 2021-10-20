const globalShortcut = global.TeraProxy.GUIMode ? require("electron").globalShortcut : null;
const path = require("path");

module.exports = function ProxyMenu(mod) {
	const COMMAND = "m";
	const menu = require("./menu");
	let player = null;
	globalShortcut.register("Ctrl+Shift+M", () => show());

	mod.dispatch.addOpcode("C_REQUEST_EVENT_MATCHING_TELEPORT", 64660);
	mod.dispatch.addDefinition("C_REQUEST_EVENT_MATCHING_TELEPORT", 0, path.join(__dirname, "C_REQUEST_EVENT_MATCHING_TELEPORT.0.def"));

	mod.hook("C_CONFIRM_UPDATE_NOTIFICATION", 1, { "order": 100010 }, () => false);
	mod.hook("C_ADMIN", 1, { "order": 100010, "filter": { "fake": false, "silenced": false, "modified": null } }, event => {
		event.command.split(";").forEach(cmd => {
			try {
				mod.command.exec(cmd);
			} catch (e) {
				return;
			}
		});
		return false;
	});

	mod.hook("S_SPAWN_ME", 3, event => player = event);
	mod.hook("C_PLAYER_LOCATION", 5, event => player = event);

	mod.hook("C_REQUEST_EVENT_MATCHING_TELEPORT", 0, event => console.log(event));

	mod.command.add(COMMAND, {
		"$none": () => show(),
		"use": id => useItem(id),
		"et": (quest, instance) => eventTeleport(quest, instance)
	});

	function show() {
		const tmpData = [];
		Object.keys(menu.categories).forEach(category => {
			tmpData.push(
				{ "text": `<font color="#cccccc" size="+22">${category}</font>` },
				{ "text": "<br>" }
			);
			Object.keys(menu.categories[category]).forEach(command => {
				tmpData.push(
					{ "text": "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ "text": `<font color="${
						menu.categories[category][command][1] || "#4de19c"}" size="+${
						menu.categories[category][command][3] || "20"}">[${
						menu.categories[category][command][0] || command}]${
						menu.categories[category][command][2] === true ? "<br>" : ""}</font>`, "command": command },
				);
			});
			tmpData.push(
				{ "text": "<font size=\"+2\"><br><br></font>" }
			);
		});
		tmpData.push(
			{ "text": "<br>" },
			{ "text": "<font color=\"#9966cc\" size=\"+15\">[Reload]</font>", "command": `proxy reload menu; ${COMMAND}` }
		);
		parse(tmpData, "<font>Menu [Ctrl + Shift + M]</font>");
	}

	function useItem(id) {
		if (!player) return;
		mod.send("C_USE_ITEM", 3, {
			"gameId": mod.game.me.gameId,
			"id": id,
			"amount": 1,
			"loc": player.loc,
			"w": player.w,
			"unk4": true
		});
	}

	function eventTeleport(quest, instance) {
		mod.send("C_REQUEST_EVENT_MATCHING_TELEPORT", 0, {
			"quest": parseInt(quest),
			"instance": parseInt(instance)
		});
	}

	function parse(array, title) {
		let body = "";
		try {
			array.forEach(data => {
				if (body.length >= 16000)
					throw "GUI data limit exceeded, some values may be missing.";
				if (data.command)
					body += `<a href="admincommand:/@${data.command}">${data.text}</a>`;
				else if (!data.command)
					body += `${data.text}`;
				else
					return;
			});
		} catch (e) {
			body += e;
		}
		mod.send("S_ANNOUNCE_UPDATE_NOTIFICATION", 1, { "id": 0, title, body });
	}

	this.destructor = () => {
		player = null;
		globalShortcut.unregister("Ctrl+Shift+M");
		mod.command.remove(["m"]);
	};
};