import { Component, OnInit, Input, NgZone } from '@angular/core';
import logger from '../logger';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-feed',
  template: `
    <div>{{item.author + item.id}} :</div>
    <div>{{item.content}}</div>
    <div>
      <button class="btn" (click)="like()">like {{item.like || ''}}</button>
      <button class="btn" (click)="toggle()">comment {{item.comments.length || ''}}</button>
    </div>
    <div *ngIf="item.isShowComment">
      <input type="text" [(ngModel)]="item.newComment" (keypress)="keypress()"/>
      <button (click)="comment()" [disabled]="!item.newComment">ok</button>
      <div *ngFor="let comment of item.comments;" >{{comment.content}}</div>
    </div>
  `,
})
export class FeedComponent {
  @Input() public item: any;

  constructor(private ngZone: NgZone) { }

  toggle() {
    this.ngZone.runOutsideAngular(() => {
      logger('toggle');
    });
    this.item.isShowComment = !this.item.isShowComment;
  }

  like() {
    this.ngZone.runOutsideAngular(() => {
      logger('like');
    });
    this.item.like += 1;
  }

  comment() {
    this.ngZone.runOutsideAngular(() => {
      logger('comment');
    });
    this.item.comments.push({
      id: this.item.id + 10000 + this.item.comments.length,
      content: this.item.newComment
    });
    this.item.newComment = "";
  }

  keypress(){
    this.ngZone.runOutsideAngular(() => {
      logger('keypress',true);
    });
  }
}
