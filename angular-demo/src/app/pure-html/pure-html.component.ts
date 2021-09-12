import { Component, OnInit, NgZone } from '@angular/core';
import logger from '../logger';
import { createItem } from '../util';

@Component({
  selector: 'app-pure-html',
  template: `
    <h2>PureHtml</h2>

    <div class="action-bar">
      <input type="text" [(ngModel)]="maxLength" />
      <button (click)="run()">run</button> &nbsp;&nbsp;&nbsp;&nbsp;
      <button (click)="unshift()">unshift</button>
      <button (click)="push()">push</button>
      <button (click)="shift()">shift</button>
      <button (click)="pop()">pop</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <input type="text" [(ngModel)]="targetId" />
      <button (click)="move()">move</button>
      <button (click)="change()">change</button>
    </div>

    <div>
      <div class="item-block" *ngFor="let item of list; trackBy: trackById">
        <div>{{item.author + item.id}} :</div>
        <div>{{item.content}}</div>
        <div>
          <button (click)="favorite(item)">favorite {{item.favorite || ''}}</button>
          <button (click)="like(item)">like {{item.like || ''}}</button>
          <button (click)="forward(item)">forward {{item.forward || ''}}</button>
          <button (click)="toggle(item)">comment {{item.comments.length || ''}}</button>
        </div>
        <div *ngIf="item.isShowComment">
          <input type="text" [(ngModel)]="item.newComment" />
          <button (click)="comment(item)" [disabled]="!item.newComment">ok</button>
          <div *ngFor="let comment of item.comments; trackBy: trackById" >{{comment.content}}</div>
        </div>
      </div>
    </div>
  `
})
export class PureHtmlComponent {
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

  toggle(item: any) {
    this.logTime('toggle');
    item.isShowComment = !item.isShowComment;
  }

  favorite(item: any) {
    this.logTime('favorite');
    item.favorite += 1;
  }

  like(item: any) {
    this.logTime('like');
    item.like += 1;
  }

  forward(item: any) {
    this.logTime('forward');
    item.forward += 1;
  }

  comment(item: any) {
    this.logTime('comment');
    item.comments.push({
      id: item.id + 10000 + item.comments.length,
      content: item.newComment
    });
    item.newComment = "";
  }

  trackById(item: any) {
    return item.id;
  }
}
