/* eslint-disable quote-props,  comma-dangle */
"use strict";

// Цвета
const c = {
	"w": "#ffffff", // белый
	"br": "#bc8f8f", // коричневый
	"o": "#daa520", // оранжевый
	"p": "#ed5d92", // розовый
	"lp": "#ffb7c5", // светло-розовый
	"r": "#fe6f5e", // красный
	"g": "#4de19c", // зеленый
	"lg": "#5bc0be", // светло-зеленый
	"v": "#9966cc", // фиолетовый
	"lv": "#e0b0ff", // светло-фиолетовый
	"b": "#436eee", // синий
	"lb": "#08b3e5", // светло-синий
	"gr": "#778899", // серый
	"y": "#c0b94d", // желтый
};

// Дочступные ключи записи:
//   name    -- Название пункта меню
//   color   -- Цвет пункта меню
//   keybind -- Установка горячей клавиши
//   class   -- Фильтр (отображение) пункта меню по игровому классу:
//                  warrior, lancer, slayer, berserker, sorcerer, archer, priest,
//                  elementalist, soulless, engineer, fighter, assassin, glaiver
//
// Встроенный команды:
//   mm et  [quest] [instance] -- Телепортация по Авангарду
//   mm use [id предмета]      -- Использовать предмет из инвентаря

module.exports = {
	"categories": {
		"Основное": [
			// https://github.com/hsdn/npc-summoner
			{ command: "bank", name: "Банк", color: c.lp },
			{ command: "pbank", name: "Перс. хранилище", color: c.lp },
			{ command: "cbank", name: "Костюмы", color: c.lp },
			{ command: "gbank", name: "Банк гильдии", color: c.lp },
			// https://github.com/Risenio/Auto-Bank
			{ command: "ab", name: "Автобанк", color: c.p },
			{},
			// https://github.com/hsdn/npc-summoner
			{ command: "broker", name: "Брокер", color: c.lg },
			{ command: "store", name: "Торговец", color: c.g },
			{ command: "sstore", name: "Магазин редкостей", color: c.g },
			{ command: "vg", name: "Торговец авангарда", color: c.g },
			{},
			// https://github.com/hsdn/teleport
			{ command: "tp to", name: "Телепорт", color: c.b },
			// https://github.com/TeraProxy/Essentials
			{ command: "ess", name: "Автоюз банки", color: c.y },
			// https://github.com/BamV/auto-loot
			{ command: "loot auto", name: "Автолут", color: c.y },
			// https://github.com/hsdn/anti-cc
			{ command: "cc", name: "Антиопрокид", color: c.y },
			{},
			// https://github.com/hsdn/auto-guild-invite
			{ command: "invg", name: "Автоприем в ги", color: c.lg },
			// https://github.com/hsdn/auto-lfg-accept
			{ command: "lfg", name: "Автоприем в лфг", color: c.lg },
			// https://github.com/teralove/translate-chat
			{ command: "translate send", name: "Автоперевод", color: c.lb },
			// https://github.com/hsdn/gathering-markers
			{ command: "gat ui", name: "Сбор", color: c.lb },
		],
		"Гоблины эксодора (монеты странствий)": [
			// [приват] Boss-Helper-NG (F)
			{ command: "tr", name: "Время спавна", color: c.lb },
			{ command: "tr scan", name: "Поиск", color: c.o },
			{ command: "tr stop", name: "Стоп", color: c.r },
			{ command: "tr loc", name: "Позиции", color: c.b },
			{ command: "bh move", name: "Телепорт под моба", color: c.lg },
		],
		"Тайные торговцы": [
			// https://github.com/hsdn/Boss-Helper
			{ command: "mm", name: "Время спавна", color: c.lb },
			{ command: "mm scan", name: "Поиск", color: c.o },
			{ command: "mm stop", name: "Стоп", color: c.r },
			{ command: "mm loc", name: "Позиции", color: c.b },
		],
		"Телепорт в город": [
			// встроено в proxy-menu
			{ command: "m et 98359 2000", name: "Эксодор", color: c.o }, // рыбалка 98359 2000, лбн 2189 3105
			{ command: "m et 2140 9780", name: "Велика", color: c.o },
			{ command: "m et 98311 9069", name: "Верхний Дозор", color: c.o },
			// купить спитки телепортов
			{ command: "m use 148", name: "Блеклый камень", color: c.lg },
			{ command: "m use 145", name: "Трия", color: c.lg },
			{},
			{ command: "m use 144", name: "Фронтера" },
			{ command: "m use 139", name: "Тулуфан" },
			{ command: "m use 147", name: "Акарум" },
			{ command: "m use 149", name: "Эленея", color: c.g },
			{},
			{ command: "m use 154", name: "Аванпост следопытов" },
			{ command: "m use 442", name: "Территория архива" },
		],
		"Неуязвимость": [
			// [приват] invincible-mode
			{ command: "inv s", name: "Статус", color: c.lb },
			{ command: "inv h 70", name: "70", color: c.y },
			{ command: "inv h 150", name: "150", color: c.y },
			{ command: "inv h 200", name: "200", color: c.y },
			{ command: "inv h 300", name: "300", color: c.y },
			{ command: "inv i", name: "Включить/Выключить", color: c.r },
		],
		"Гайд (tera-guide)": [
			// https://github.com/hsdn/tera-guide
			{ command: "guide ui", name: "Настройка" },
			{ command: "guide stream", name: "Стрим", color: c.y },
			{ command: "guide voice", name: "Голос", color: c.y },
			{ command: "guide spawnObject", name: "Объекты", color: c.y },
			{ command: "guide debug ui", name: "Отладка", color: c.b },
		],
		"Разное": [
			// https://github.com/hsdn/teleport
			{ command: "tp blink 100", name: "Блинк вперед" },
			{ command: "tp up 600", name: "Блинк вверх" },
			{ command: "tp down 250", name: "Блинк вниз" },
			{ command: "tp drop -1", name: "Убить себя", color: c.r },
			// [приват] super-sorc
			{ command: "sorc ui", name: "Сорк", color: c.lb, class: "sorcerer" },
			// [приват] super-braw
			{ command: "braw ui", name: "Круш", color: c.lb, class: "fighter" },
			// [приват] mystic-bot
			{ command: "mb ui", name: "Мист", color: c.lb, class: "elementalist" },
		],
	}
};