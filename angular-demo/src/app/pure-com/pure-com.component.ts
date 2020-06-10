import { Component, OnInit, NgZone } from '@angular/core';
import logger from '../logger';
import { first } from 'rxjs/internal/operators/first';
import { createItem } from '../util';

@Component({
  selector: 'app-pure-com',
  template: `
    <h2>PureComponent</h2>
    <div class="action-bar">
      <input type="text" [(ngModel)]="maxLength" />
      <button (click)="logTime('run',run())">run</button> &nbsp;&nbsp;&nbsp;&nbsp;
      <button (click)="logTime('unshift',unshift())">unshift</button>
      <button (click)="logTime('push',push())">push</button>
      <button (click)="logTime('shift',shift())">shift</button>
      <button (click)="logTime('pop',pop())">pop</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <input type="text" [(ngModel)]="targetId" />
      <button (click)="logTime('move',move())" [disabled]="!targetId">move</button>
      <button (click)="logTime('change',change())" [disabled]="!targetId">change</button>
    </div>

    <div>
      <app-feed class="item-block" *ngFor="let item of list;trackBy: trackById" [item]="item" ></app-feed>
    </div>
  `,
  styles: [
  ]
})
export class PureComComponent {
  list = [];
  maxLength = 30000;
  targetId = 10;
  constructor(private ngZone: NgZone) { }

  logTime(sign: string, fnReturn?) {
    this.ngZone.runOutsideAngular(() => {
      logger(this.ngZone.onStable.pipe(first()), sign);
    });
  }

  run() {
    this.list = [];
    for (let i = 0; i < this.maxLength; i++) {
      this.list.push(createItem());
    }
  }

  unshift() {
    this.list.unshift(createItem());
  }

  push() {
    this.list.push(createItem());
  }

  shift() {
    this.list.shift();
  }

  pop() {
    this.list.pop();
  }

  move() {
    const index = this.list.findIndex(item => item.id === +this.targetId);
    const [item] = this.list.splice(index, 1);
    this.list.unshift(item);
  }

  change() {
    const index = this.list.findIndex(item => item.id === +this.targetId);
    const item = createItem();
    this.list.splice(index, 1, item);
  }

  trackById(item) {
    return item.id;
  }
}
