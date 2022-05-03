'use strict';

export default class DisplayTimerView {
	constructor() {
		this.numTimeCount = 0;
	}
	getFullYear() {
		const date = new Date();
		return date.getFullYear();
	}
	getMonth() {
		const date = new Date();
		return date.getMonth() + 1;
	}
	getDate() {
		const date = new Date();
		return date.getDate();
	}
	getDay() {
		const date = new Date();
		return date.getDay();
	}
	getHours() {
		const date = new Date();
		return date.getHours();
	}
	getMinutes() {
		const date = new Date();
		return date.getMinutes();
	}
	getSeconds() {
		const date = new Date();
		return date.getSeconds();
	}
	get numTime() {
		return this.numTimeCount;
	}

	set numTime(numArg) {
		this.numTimeCount = numArg;
	}
}
