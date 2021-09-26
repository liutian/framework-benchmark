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
      <input type="text" [(ngModel)]="item.newComment" />
      <button (click)="comment()" [disabled]="!item.newComment">ok</button>
      <div *ngFor="let comment of item.comments; trackBy: trackById" >{{comment.content}}</div>
    </div>
  `,
})
export class FeedComponent {
  @Input() public item: any;

  constructor(private ngZone: NgZone) { }

  logTime(trackId: string) {
    this.ngZone.runOutsideAngular(() => {
      logger(trackId);
    });
  }

  toggle() {
    this.logTime('toggle');
    this.item.isShowComment = !this.item.isShowComment;
  }

  like() {
    this.logTime('like');
    this.item.like += 1;
  }

  comment() {
    this.logTime('comment');
    this.item.comments.push({
      id: this.item.id + 10000 + this.item.comments.length,
      content: this.item.newComment
    });
    this.item.newComment = "";
  }

  trackById(comment: any) {
    return comment.id;
  }
}
