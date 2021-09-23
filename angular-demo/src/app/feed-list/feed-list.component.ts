import { Component, OnInit, NgZone } from '@angular/core';
import logger from '../logger';
import { createItem } from '../util';

@Component({
  selector: 'app-feed-list',
  template: `
  <div class="action-bar">
    <h2>feed list</h2>
      <input type="text" [(ngModel)]="maxLength" />
      <button (click)="batchCreate()">batchCreate</button> 
      <button (click)="clear()">clear</button> 
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button (click)="unshift()">unshift</button>
      <button (click)="push()">push</button>
      <button (click)="shift()">shift</button>
      <button (click)="pop()">pop</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <input type="text" [(ngModel)]="targetId" />
      <button (click)="moveHead()" [disabled]="!targetId">moveHead</button>
      <button (click)="replace()" [disabled]="!targetId">replace</button>
      <button (click)="del()" [disabled]="!targetId">del</button>
    </div>

    <div class="container">
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

  batchCreate() {
    this.logTime('batchCreate');
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

  moveHead() {
    this.logTime('moveHead');
    const index = this.list.findIndex(item => item.id === +this.targetId);
    const [item] = this.list.splice(index, 1);
    this.list.unshift(item);
  }

  replace() {
    this.logTime('replace');
    const index = this.list.findIndex(item => item.id === +this.targetId);
    const item = createItem();
    this.list.splice(index, 1, item);
  }

  del() {
    this.logTime('del');
    const index = this.list.findIndex(item => item.id === +this.targetId);
    this.list.splice(index, 1);
  }

  clear() {
    this.logTime('clear');
    this.list = [];
  }

  trackById(item: any) {
    return item.id;
  }
}
