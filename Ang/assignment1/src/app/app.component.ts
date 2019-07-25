import { Component } from '@angular/core';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment1';
  ServerName = 'Apollo';
  ServerPID = 11;
  ServerStatus = 'offline';
  statusFlag = false;
  buttonState = true;
  firstName = 'Rajesh';
  state = false;
  flag = true;
  studentRoster = ['Arya', 'Rohit', 'Upasana'];
  currentName = '';
  paragraph = true;
  noClicks = 0;

  add() {
    this.studentRoster.push(this.currentName);
  }

  toggleFlag() {
    this.flag = !this.flag;
    return this.flag;
  }

  toggleParagraph() {
    this.paragraph = !this.paragraph;
    this.noClicks = this.noClicks + 1;
    return this.paragraph;
  }

  getBtnColor() {
    if (this.noClicks > 5) {
      return 'pink';
    } else {
      return 'green';
    }
  }

  getColor() {
    if (this.flag === true) {
      return 'green';
    } else {
      return 'red';
    }
  }

  constructor() {
    setTimeout(() => {
        this.buttonState = false;
        this.state = false;
    }, 500);
  }

  emptyFirstName() {
    this.firstName = '';
    this.state = true;
  }

  emptyName() {
    if (this.firstName === '') {
      this.state = true;
      return this.state;
    }
  }

  toggleServerStatus() {
    this.statusFlag = !this.statusFlag;
    if (this.statusFlag == true) {
      this.ServerStatus = 'online';
    } else {
      this.ServerStatus = 'offline';
    }

    return this.ServerStatus;
  }
}
