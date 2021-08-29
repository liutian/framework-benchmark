import { Component, OnInit, NgZone } from '@angular/core';
import logger from '../logger';
import { createItem } from '../util';

@Component({
  selector: 'app-pure-html',
  template: `
    <h2>PureHtml</h2>

    <div class="action-bar">
      <input type="text" [(ngModel)]="maxLength" />
      <button (click)="logTime('run',run())">run</button> &nbsp;&nbsp;&nbsp;&nbsp;
      <button (click)="logTime('unshift',unshift())">unshift</button>
      <button (click)="logTime('push',push())">push</button>
      <button (click)="logTime('shift',shift())">shift</button>
      <button (click)="logTime('pop',pop())">pop</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <input type="text" [(ngModel)]="targetId" />
      <button (click)="logTime('move',move())">move</button>
      <button (click)="logTime('change',change())">change</button>
    </div>

    <div>
      <div class="item-block" *ngFor="let item of list; trackBy: trackById">
        <div>{{item.author + item.id}} :</div>
        <div>{{item.content}}</div>
        <div>
          <button
            class="btn"
            (click)="logTime('favorite',favorite(item))"
          >favorite {{item.favorite || ''}}</button>
          <button class="btn" (click)="logTime('like',like(item))">like {{item.like || ''}}</button>
          <button
            class="btn"
            (click)="logTime('forward',forward(item))"
          >forward {{item.forward || ''}}</button>
          <button
            class="btn"
            (click)="logTime('toggle',toggle(item))"
          >comment {{item.comments.length || ''}}</button>
        </div>
        <div *ngIf="item.isShowComment">
          <input type="text" [(ngModel)]="item.newComment" />
          <button (click)="logTime('comment',comment(item))" [disabled]="!item.newComment">ok</button>
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

  logTime(sign: string, fnReturn?: any) {
    this.ngZone.runOutsideAngular(() => {
      logger(sign);
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

  toggle(item: any) {
    item.isShowComment = !item.isShowComment;
  }

  favorite(item: any) {
    item.favorite += 1;
  }

  like(item: any) {
    item.like += 1;
  }

  forward(item: any) {
    item.forward += 1;
  }

  comment(item: any) {
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
