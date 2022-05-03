'use strict';

import TimerRecordModel from '../model/TimerRecordModel.js';
import TimerTodayModel from '../model/TimerTodayModel.js';

import DisplayTimerView from '../view/DisplayTimerView.js';
import RecordTimerView from '../view/RecordTimerView.js';

import Constants from '../utils/Constants.js';

export default class Controller {
	constructor(app) {
		this.app = document.querySelector(app);
		this.displayTimerView = new DisplayTimerView();
		this.boolPrintLabHandler = false;
		this.boolHandler = true;
		this.numID = 1;
	}
	init() {
		this.app.innerHTML = `
    <main class="mainContainer">
      <h1 class="h1Title">Timer</h1>
      <section class="sectionClockContainer">
        <article class="articleClockContainer">
					<div class="divTodayContainer">
						<div class="divToday">${this.todayCurrentClock()}</div>
						<div class="divCurrentTime">${this.printCurrentTime()}</div>
					</div>
          <div class="divStopWatch">00:00:00.00</div>
        </article>
      </section>
			<section class="sectionLabContainer">
				<article class="articleButtonContainer">
					<button class="buttonFuncChange">Lab</button>
					<button class="buttonFuncChange">Start</button>
				</article>
				<nav class="navSectionTimeContainer">
					<ul class="ulSectionTimerContainer"></ul>
				</nav>
			</section>
    </main>
    `;
		this.buttonController();
	}

	todayCurrentClock() {
		return (
			'' +
			this.displayTimerView.getFullYear() +
			'-' +
			this.printZero(this.displayTimerView.getMonth()) +
			'-' +
			this.printZero(this.displayTimerView.getDate()) +
			' ' +
			TimerTodayModel['arrDay'][this.displayTimerView.getDay()]
		);
	}

	todayAmPm() {
		return this.displayTimerView.getHours() >= 12 ? TimerTodayModel['arrAmPm'][1] : TimerTodayModel['arrAmPm'][0];
	}

	printCurrentTime() {
		setTimeout(() => {
			document.querySelector('.divCurrentTime').textContent = this.todayCurrentTime();
			this.printCurrentTime();
		}, 1000);
	}
	hourZeroToTwenty() {
		let hour = this.displayTimerView.getHours();
		hour %= 12;
		return (hour = hour || 12);
	}
	todayCurrentTime() {
		return this.todayAmPm() + ' ' + this.printZero(this.hourZeroToTwenty()) + ':' + this.twoDigitsMinutes() + ':' + this.twoDigitsSeconds();
	}

	twoDigitsMinutes() {
		return this.printZero(this.displayTimerView.getMinutes());
	}

	twoDigitsSeconds() {
		return this.printZero(this.displayTimerView.getSeconds());
	}

	buttonController() {
		document.querySelectorAll('.buttonFuncChange').forEach((value, index, array) => {
			value.addEventListener('click', ({ target }) => {
				switch (target.textContent) {
					case 'Start':
						this.boolPrintLabHandler = true;
						target.textContent = Constants['buttonStop'];
						this.stopWatchStart();
						break;
					case 'Stop':
						this.boolPrintLabHandler = false;
						target.textContent = Constants['buttonContinue'];
						array[0].textContent = Constants['buttonReset'];
						this.stopWatchStop();
						break;
					case 'Continue':
						this.boolPrintLabHandler = true;
						target.textContent = Constants['buttonStop'];
						array[0].textContent = Constants['buttonLab'];
						this.stopWatchStart();
						break;
					case 'Reset':
						this.boolPrintLabHandler = false;
						this.numID = 1;
						RecordTimerView['timerDate'] = [];
						array[0].textContent = Constants['buttonLab'];
						array[1].textContent = Constants['buttonStart'];
						this.stopWatchReset();
						this.stopWatchStart();
						this.removeLab();
						break;
					case 'Lab':
						if (this.boolPrintLabHandler == false) return;
						const strLabTimer = document.querySelector('.divStopWatch').textContent;
						RecordTimerView.addTimerData({ id: this.numID++, timer: strLabTimer });
						this.printLab(RecordTimerView.timerData);
						break;
				}
			});
		});
	}

	stopWatchStart() {
		if (this.boolHandler) {
			setTimeout(() => {
				this.printTimer();
				this.stopWatchStart();
			}, 10);
		} else {
			this.boolHandler = true;
			return;
		}
	}

	removeLab() {
		document.querySelector('.ulSectionTimerContainer').innerHTML = '';
	}

	printTimer() {
		document.querySelector('.divStopWatch').textContent = `
		${this.printZero(Math.floor(this.divideByHundred(this.displayTimerView.numTime) / 60 / 60))}:${this.printZero(
			Math.floor(this.divideByHundred(this.displayTimerView.numTime) / 60) % 60
		)}:${this.printZero(Math.floor(this.divideByHundred(this.displayTimerView.numTime)) % 60)}.${this.printZero(this.displayTimerView.numTime % 100)}
		`;

		this.displayTimerView.numTime = this.displayTimerView.numTime + 1;
	}

	divideByHundred(numTimerArg) {
		return numTimerArg / 100;
	}

	printZero(numTimerArg) {
		return numTimerArg < 10 ? '0' + numTimerArg : numTimerArg;
	}

	stopWatchStop() {
		this.boolHandler = false;
	}

	stopWatchReset() {
		this.boolHandler = false;
		this.displayTimerView.numTime = 0;
		this.printTimer();
	}

	printLab(arrTimerDataArg) {
		document.querySelector('.ulSectionTimerContainer').innerHTML += `<li class="liSectionTime">
			Lab ${arrTimerDataArg[arrTimerDataArg.length - 1]['id']}
			<span class="spanSectionTime">${arrTimerDataArg[arrTimerDataArg.length - 1]['timer']}</span>
		</li>`;
	}
}
