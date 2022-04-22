const OPCODES = {
	"C_REQUEST_EVENT_MATCHING_TELEPORT": {
		"367081": 59605, // GF v92.04
		"385362": 64660, // GF v110.02
		"384821": 33555, // GF v110.03
		"386769": 26653, // GF v112.02
		"387400": 36934, // GF v114.02
		"387463": 26295 // GF v115.02
	}
};

const moment = require("moment-timezone");
const globalShortcut = global.TeraProxy.GUIMode ? require("electron").globalShortcut : null;

function addOpcodeAndDefinition(mod, name, version = null, definition = null) {
	if (OPCODES[name] !== undefined && OPCODES[name][mod.dispatch.protocolVersion] !== undefined) {
		mod.dispatch.addOpcode(name, OPCODES[name][mod.dispatch.protocolVersion]);
	}
	if (version !== null && definition !== null) {
		mod.dispatch.addDefinition(name, version, definition);
	}
}

module.exports = function ProxyMenu(mod) {
	const COMMAND = "m";
	const menu = require("./menu");
	const keybinds = new Set();
	let player = null;
	let debug = false;
	let premiumAvailable = false;

	mod.game.initialize("inventory");

	Object.keys(menu.categories).forEach(category =>
		Object.keys(menu.categories[category]).forEach(command => {
			if (menu.categories[category][command].keybind) {
				try {
					globalShortcut.register(menu.categories[category][command].keybind, () =>
						mod.command.exec(command)
					);
					keybinds.add(menu.categories[category][command].keybind);
				} catch (e) {}
			}
		})
	);

	keybinds.add(mod.settings.hotkey);
	globalShortcut.register(mod.settings.hotkey, () => show());

	addOpcodeAndDefinition(mod, "C_REQUEST_EVENT_MATCHING_TELEPORT", 0, [
		["unk1", "uint32"],
		["quest", "uint32"],
		["instance", "uint32"],
		["unk2", "uint32"],
		["unk3", "uint32"]
	]);

	mod.hook("C_CONFIRM_UPDATE_NOTIFICATION", 1, { "order": 100010 }, () => false);
	mod.hook("C_ADMIN", 1, { "order": 100010, "filter": { "fake": false, "silenced": false, "modified": null } }, event => {
		if (event.command.includes(";")) {
			event.command.split(";").forEach(cmd => {
				try {
					mod.command.exec(cmd);
				} catch (e) {
					return;
				}
			});
			return false;
		}
	});

	mod.hook("S_SPAWN_ME", 3, event => { player = event; });
	mod.hook("C_PLAYER_LOCATION", 5, event => { player = event; });

	mod.hook("C_REQUEST_EVENT_MATCHING_TELEPORT", 0, event => {
		if (debug) console.log("C_REQUEST_EVENT_MATCHING_TELEPORT:", event);
	});

	mod.hook("S_PREMIUM_SLOT_OFF", "raw", () => !mod.settings.premiumSlotEnabled);

	mod.hook("S_RETURN_TO_LOBBY", "raw", () => {
		premiumAvailable = false;
	});

	mod.hook("S_LOAD_TOPO", "raw", () => {
		if (premiumAvailable || !mod.settings.premiumSlotEnabled || menu.premium.length === 0) return;
		mod.send("S_PREMIUM_SLOT_DATALIST", 2, {
			"sets": [
				{ "id": 0, "inventory": [] }
			]
		});
	});

	mod.hook("S_PREMIUM_SLOT_DATALIST", 2, { "order": Infinity, "filter": { "fake": null } }, event => {
		if (!mod.settings.premiumSlotEnabled || menu.premium.length === 0) return;
		premiumAvailable = true;
		menu.premium.forEach(slot => {
			if (slot.class) {
				const classes = (Array.isArray(slot.class) ? slot.class : [slot.class]);
				if (!classes.includes(mod.game.me.class)) {
					return;
				}
			}
			if (slot.ifcmd && !mod.command.base.hooks.has(slot.ifcmd.toLocaleLowerCase())) {
				return;
			}
			if (slot.ifnocmd && mod.command.base.hooks.has(slot.ifnocmd.toLocaleLowerCase())) {
				return;
			}
			if (!mod.command.base.hooks.has(slot.command.split(" ")[0])) {
				return;
			}
			event.sets[0].inventory.push({
				"slot": event.sets[0].inventory.length + 1,
				"unk1": 1,
				"type": 1,
				"id": slot.id,
				"amount": -1,
				"cooldown": "30000",
				"cooldownRemaining": "0",
				"unk2": true
			});
		});
		return true;
	});

	mod.hook("C_USE_PREMIUM_SLOT", 1, event => {
		if (menu.premium.length === 0) return;
		let used = false;
		menu.premium.forEach(slot => {
			if (slot.command && event.id === slot.id) {
				mod.command.exec(slot.command);
				used = true;
			}
		});
		if (used) {
			return false;
		}
	});

	mod.command.add(COMMAND, {
		"$none": () => show(),
		"premium": () => {
			mod.settings.premiumSlotEnabled = !mod.settings.premiumSlotEnabled;
			mod.command.message(`Add item to premium panel: ${mod.settings.premiumSlotEnabled ? "enabled" : "disabled"}`);
		},
		"hotkey": arg => {
			if (!arg) {
				mod.command.message(`Current hotkey: ${mod.settings.hotkey}`);
			} else {
				if (arg.toLowerCase() !== mod.settings.hotkey.toLowerCase()) {
					const hotkey = arg.toLowerCase().split("+").map(w => w[0].toUpperCase() + w.substr(1)).join("+");
					try {
						globalShortcut.register(hotkey, () => show());
						globalShortcut.unregister(mod.settings.hotkey);
						keybinds.add(hotkey);
						keybinds.delete(mod.settings.hotkey);
						mod.settings.hotkey = hotkey;
					} catch (e) {
						return mod.command.message(`Invalid hotkey: ${hotkey}`);
					}
				}
				mod.command.message(`New hotkey: ${mod.settings.hotkey}`);
			}
		},
		"use": id => useItem(id),
		"et": (quest, instance) => eventTeleport(quest, instance),
		"debug": () => {
			debug = !debug;
			mod.command.message(`Debug mode ${debug ? "enabled" : "disabled"}.`);
		}
	});

	function show() {
		const tmpData = [];
		Object.keys(menu.categories).forEach(category => {
			tmpData.push(
				{ "text": `<font color="#cccccc" size="+22">${category}</font>` },
				{ "text": "<br>" }
			);
			menu.categories[category].forEach(menuEntry => {
				if (menuEntry.class) {
					const classes = (Array.isArray(menuEntry.class) ? menuEntry.class : [menuEntry.class]);
					if (!classes.includes(mod.game.me.class)) {
						return;
					}
				}
				if (menuEntry.ifcmd && !mod.command.base.hooks.has(menuEntry.ifcmd.toLocaleLowerCase())) {
					return;
				}
				if (menuEntry.ifnocmd && mod.command.base.hooks.has(menuEntry.ifnocmd.toLocaleLowerCase())) {
					return;
				}
				if (!menuEntry.command || !menuEntry.name) {
					tmpData.push({ "text": "<br>" });
					return;
				}
				const commandParts = menuEntry.command.split(" ");
				let available = mod.command.base.hooks.has(commandParts[0]);
				if (commandParts[0].toLocaleLowerCase() === COMMAND && commandParts[1].toLocaleLowerCase() === "use") {
					available = false;
					const items = mod.game.inventory.findAll(parseInt(commandParts[2]));
					if (items.length !== 0) {
						available = items[0].amount > 0;
					}
				}
				if (available) {
					tmpData.push(
						{ "text": "&nbsp;&nbsp;&nbsp;&nbsp;" },
						{ "text": `<font color="${
							menuEntry.color || "#4de19c"}" size="+${
							menuEntry.size || "20"}">[${
							menuEntry.name || menuEntry.command}]</font>`,
						"command": `${menuEntry.command}` }
					);
				} else {
					tmpData.push(
						{ "text": "&nbsp;&nbsp;&nbsp;&nbsp;" },
						{ "text": `<font color="#777777" size="+${
							menuEntry.size || "20"}">[${
							menuEntry.name || menuEntry.command}]</font>` }
					);
				}
			});
			tmpData.push(
				{ "text": "<font size=\"+2\"><br><br></font>" }
			);
		});
		tmpData.push(
			{ "text": "<br>" },
			{ "text": "<font color=\"#9966cc\" size=\"+15\">[Reload]</font>", "command": `proxy reload proxy-menu; ${COMMAND}` },
			{ "text": "&nbsp;&nbsp;&nbsp;&nbsp;" },
			{ "text": `<font color="#dddddd" size="+18">${moment().tz("Europe/Berlin").format("HH:mm z")} / ${moment().tz("Europe/Moscow").format("HH:mm z")}</font>` }
		);
		parse(tmpData, `<font>Menu [${mod.settings.hotkey.replaceAll("+", " + ")}]</font>`);
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
					body += `<a href="admincommand:/@${data.command};">${data.text}</a>`;
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

	this.saveState = () => ({ player });
	this.loadState = state => player = state.player;

	this.destructor = () => {
		keybinds.forEach(keybind => globalShortcut.unregister(keybind));
		mod.command.remove(COMMAND);
	};
};