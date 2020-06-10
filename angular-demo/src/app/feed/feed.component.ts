import { Component, OnInit, Input, NgZone } from '@angular/core';
import logger from '../logger';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-feed',
  template: `
    <div>{{item.author + item.id}} :</div>
    <div>{{item.content}}</div>
    <div>
      <button class="btn" (click)="logTime('favorite',favorite())">favorite {{item.favorite || ''}}</button>
      <button class="btn" (click)="logTime('like',like())">like {{item.like || ''}}</button>
      <button class="btn" (click)="logTime('forward',forward())">forward {{item.forward || ''}}</button>
      <button class="btn" (click)="logTime('toggle',toggle())">comment {{item.comments.length || ''}}</button>
    </div>
    <div *ngIf="item.isShowComment">
      <input type="text" [(ngModel)]="item.newComment" />
      <button (click)="logTime('comment',comment())" [disabled]="!item.newComment">ok</button>
      <div *ngFor="let comment of item.comments; trackBy: trackById" >{{comment.content}}</div>
    </div>
  `,
  styles: [
  ]
})
export class FeedComponent {
  @Input() public item;

  constructor(private ngZone: NgZone) { }

  logTime(sign: string, fnReturn?) {
    this.ngZone.runOutsideAngular(() => {
      logger(this.ngZone.onStable.pipe(first()), sign);
    });
  }

  toggle() {
    this.item.isShowComment = !this.item.isShowComment;
  }

  favorite() {
    this.item.favorite += 1;
  }

  like() {
    this.item.like += 1;
  }

  forward() {
    this.item.forward += 1;
  }

  comment() {
    this.item.comments.push({
      id: this.item.id + 10000 + this.item.comments.length,
      content: this.item.newComment
    });
    this.item.newComment = "";
  }

  trackById(comment) {
    return comment.id;
  }
}
