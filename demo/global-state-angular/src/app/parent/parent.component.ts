import { Component } from '@angular/core';
import dataSource from '~/dataSource';

@Component({
  selector: 'parent',
  template: `
    <p style="border: solid 1px red;">
      parent
      <button (click)="tick()">count {{dataSource.count}}</button>
      <demo></demo>
      <sibling></sibling>
    </p>
  `,
  styles: []
})
export class ParentComponent {

  dataSource = dataSource;

  tick() {
    this.dataSource.tick();
  }

  ngAfterViewChecked() {
    console.log('parent view checked')
  }
}
