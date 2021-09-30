import { Component } from '@angular/core';
import dataSource from '~/dataSource';

@Component({
  selector: 'child-b',
  template: `
    <p>
      child-b
      <button (click)="tick()">count {{dataSource.count}}</button>
    </p>
  `,
  styles: []
})
export class ChildBComponent {
  dataSource = dataSource;

  tick() {
    this.dataSource.tick();
  }

  ngAfterViewChecked() {
    console.log('child-b view checked')
  }
}
