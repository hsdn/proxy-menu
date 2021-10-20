/* eslint-disable no-unused-vars, comma-dangle */
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

module.exports = {
	"categories": {
		"Основное": {
			"bank": ["Банк", c.lp],
			"pbank": ["Персональное хранилище", c.lp],
			"ab": ["Автобанк", c.p],
			"invg": ["Прием в ги", c.lg, true],
			"broker": ["Брокер", c.lg],
			"gbank": ["Банк гильдии", c.g],
			"store": ["Торговец", c.g],
			"sstore": ["Магазин редкостей", c.g, true],
			"tp to": ["Меню телепорта", c.b],
			"ess": ["Автоюз банки", c.y],
			"cc": ["Антиопрокид", c.g],
			"translate send": ["Автоперевод", c.lb],
		},
		"Гоблины эксодора (монеты странствий)": {
			"tr": ["Время спавна", c.lb],
			"tr scan": ["Поиск", c.o],
			"tr stop": ["Стоп", c.r],
		},
		"Тайные торговцы": {
			"mm": ["Время спавна", c.lb],
			"mm scan": ["Поиск", c.o],
			"mm stop": ["Стоп", c.r],
		},
		"Телепорт в город": {
			"m et 2188 3205": ["Эксодор", c.o],
			"m et 2140 9780": ["Велика", c.o],
			"m et 98311 9069": ["Верхний Дозор", c.o],
			"m et 2321 13": ["Остров Зари", c.o, true],
			"m use 148": ["Блеклый камень", c.lg],
			"m use 145": ["Трия", c.lg, true],
			"m use 144": ["Фронтера"],
			"m use 139": ["Тулуфан"],
			"m use 147": ["Акарум"],
			"m use 149": ["Эления", c.g, true],
			"m use 154": ["Аванпост следопытов"],
			"m use 442": ["Территория архива"],
		},
		"Неуязвимость": {
			"inv s": ["Статус", c.lb],
			"inv h 70": ["70", c.y],
			"inv h 150": ["150", c.y],
			"inv h 200": ["200", c.y],
			"inv h 300": ["300", c.y],
			"inv i": ["Включить/Выключить", c.r],
		},
		"Гайд (tera-guide)": {
			"guide ui": ["Настройка"],
			"guide stream": ["Стрим", c.y],
			"guide voice": ["Голос", c.y],
			"guide spawnObject": ["Объекты", c.y],
			"guide debug ui": ["Отладка", c.b],
		},
		"Разное": {
			"tp blink 100": ["Блинк вперед"],
			"tp up 250": ["Блинк вверх"],
			"tp down 250": ["Блинк вниз"],
			"tp drop -1": ["Убить себя", c.r],
		},
	}
};