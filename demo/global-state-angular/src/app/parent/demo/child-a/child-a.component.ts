import { Component } from '@angular/core';
import dataSource from '~/dataSource';

@Component({
  selector: 'child-a',
  template: `
    <p>
      child-a
      <button (click)="tick()">count {{dataSource.count}}</button>
    </p>
  `,
  styles: []
})
export class ChildAComponent {
  dataSource = dataSource;

  tick() {
    this.dataSource.tick();
  }

  ngAfterViewChecked() {
    console.log('child-a view checked')
  }
}
