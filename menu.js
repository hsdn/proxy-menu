/* eslint-disable quote-props,  comma-dangle */
"use strict";

const c = {
	"w": "#ffffff", // white
	"br": "#bc8f8f", // brown
	"o": "#daa520", // orange
	"lp": "#ffb7c5", // light pink
	"p": "#ed5d92", // pink
	"r": "#fe6f5e", // red
	"g": "#4de19c", // green
	"lv": "#e0b0ff", // light violet
	"v": "#9966cc", // violet
	"b": "#436eee", // blue
	"lb": "#08b3e5", // light blue
	"gr": "#778899", // gray
	"y": "#c0b94d", // yellow
	"lg": "#5bc0be", // light green
};

// Available keys:
//   name    -- Name of entry
//   color   -- Set color of entry text
//   nl      -- Enable/disable add new line after entry
//   keybind -- Set a key bind for command

module.exports = {
	"categories": {
		"Основное": {
			// https://github.com/hsdn/npc-summoner
			"bank": { name: "Банк", color: c.lp },
			"pbank": { name: "Перс. хранилище", color: c.lp },
			"cbank": { name: "Костюмы", color: c.lp },
			"gbank": { name: "Банк гильдии", color: c.lp },
			// https://github.com/Risenio/Auto-Bank
			"ab": { name: "Автобанк", color: c.p, nl: true },
			// https://github.com/hsdn/npc-summoner
			"broker": { name: "Брокер", color: c.lg },
			"store": { name: "Торговец", color: c.g },
			"sstore": { name: "Магазин редкостей", color: c.g },
			"vg": { name: "Торговец авангарда", color: c.g, nl: true },
			// https://github.com/hsdn/teleport
			"tp to": { name: "Телепорт", color: c.b },
			// https://github.com/TeraProxy/Essentials
			"ess": { name: "Автоюз банки", color: c.y },
			// https://github.com/BamV/auto-loot
			"loot auto": { name: "Автолут", color: c.g },
			// https://github.com/hsdn/anti-cc
			"cc": { name: "Антиопрокид", color: c.g, nl: true },
			// https://github.com/hsdn/auto-guild-invite
			"invg": { name: "Авторием в ги", color: c.lg },
			// https://github.com/hsdn/auto-lfg-accept
			"lfg": { name: "Авторием в лфг", color: c.lg },
			// https://github.com/teralove/translate-chat
			"translate send": { name: "Перевод", color: c.lb },
		},
		"Гоблины эксодора (монеты странствий)": {
			// [платный] Boss-Helper-NG (F)
			"tr": { name: "Время спавна", color: c.lb },
			"tr scan": { name: "Поиск", color: c.o },
			"tr stop": { name: "Стоп", color: c.r },
		},
		"Тайные торговцы": {
			// https://github.com/hsdn/Boss-Helper
			"mm": { name: "Время спавна", color: c.lb },
			"mm scan": { name: "Поиск", color: c.o },
			"mm stop": { name: "Стоп", color: c.r },
		},
		"Телепорт в город": {
			// встроено в proxy-menu
			"m et 98359 2000": { name: "Эксодор", color: c.o }, // рыбалка 98359 2000, лбн 2189 3105
			"m et 2140 9780": { name: "Велика", color: c.o },
			"m et 98311 9069": { name: "Верхний Дозор", color: c.o },
			// купить спитки телепортов
			"m use 148": { name: "Блеклый камень", color: c.lg },
			"m use 145": { name: "Трия", color: c.lg, nl: true },
			"m use 144": { name: "Фронтера" },
			"m use 139": { name: "Тулуфан" },
			"m use 147": { name: "Акарум" },
			"m use 149": { name: "Эленея", color: c.g, nl: true },
			"m use 154": { name: "Аванпост следопытов" },
			"m use 442": { name: "Территория архива" },
		},
		"Неуязвимость": {
			// [платный] invincible-mode
			"inv s": { name: "Статус", color: c.lb },
			"inv h 70": { name: "70", color: c.y },
			"inv h 150": { name: "150", color: c.y },
			"inv h 200": { name: "200", color: c.y },
			"inv h 300": { name: "300", color: c.y },
			"inv i": { name: "Включить/Выключить", color: c.r },
		},
		"Гайд (tera-guide)": {
			// https://github.com/hsdn/tera-guide
			"guide ui": { name: "Настройка" },
			"guide stream": { name: "Стрим", color: c.y },
			"guide voice": { name: "Голос", color: c.y },
			"guide spawnObject": { name: "Объекты", color: c.y },
			"guide debug ui": { name: "Отладка", color: c.b },
		},
		"Разное": {
			// https://github.com/hsdn/teleport
			"tp blink 100": { name: "Блинк вперед" },
			"tp up 250": { name: "Блинк вверх" },
			"tp down 250": { name: "Блинк вниз" },
			"tp drop -1": { name: "Убить себя", color: c.r },
			// https://github.com/hsdn/gathering-markers
			"gat ui": { name: "Сбор", color: c.lb },
		},
	}
};