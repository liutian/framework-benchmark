import { Component, OnInit, NgZone } from '@angular/core';
import logger from '../logger';
import { createItem } from '../util';

@Component({
  selector: 'app-feed-list',
  template: `
    <h2>feed list</h2>
    <div class="action-bar">
      <input type="text" [(ngModel)]="maxLength" />
      <button (click)="run()">run</button> 
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button (click)="unshift()">unshift</button>
      <button (click)="push()">push</button>
      <button (click)="shift()">shift</button>
      <button (click)="pop()">pop</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <input type="text" [(ngModel)]="targetId" />
      <button (click)="move()" [disabled]="!targetId">move</button>
      <button (click)="change()" [disabled]="!targetId">change</button>
    </div>

    <div>
      <app-feed class="item-block" *ngFor="let item of list;trackBy: trackById" [item]="item" ></app-feed>
    </div>
  `,
})
export class FeedListComponent {
  list: any[] = [];
  maxLength = 30000;
  targetId = 10;
  constructor(private ngZone: NgZone) { }

  logTime(sign: string) {
    this.ngZone.runOutsideAngular(() => {
      logger(sign);
    });
  }

  run() {
    this.logTime('run');
    this.list = [];
    for (let i = 0; i < this.maxLength; i++) {
      this.list.push(createItem());
    }
  }

  unshift() {
    this.logTime('unshift');
    this.list.unshift(createItem());
  }

  push() {
    this.logTime('push');
    this.list.push(createItem());
  }

  shift() {
    this.logTime('shift');
    this.list.shift();
  }

  pop() {
    this.logTime('pop');
    this.list.pop();
  }

  move() {
    this.logTime('move');
    const index = this.list.findIndex(item => item.id === +this.targetId);
    const [item] = this.list.splice(index, 1);
    this.list.unshift(item);
  }

  change() {
    this.logTime('change');
    const index = this.list.findIndex(item => item.id === +this.targetId);
    const item = createItem();
    this.list.splice(index, 1, item);
  }

  trackById(item: any) {
    return item.id;
  }
}
