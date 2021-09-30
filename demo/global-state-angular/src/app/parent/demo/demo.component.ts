import { Component } from '@angular/core';
import dataSource from '~/dataSource';

@Component({
  selector: 'demo',
  template: `
    <p style="border: solid 1px blue">
      demo 
      <button (click)="tick()">count {{dataSource.count}}</button>
      <child-a></child-a>
      <child-b></child-b>
    </p>
  `,
  styles: []
})
export class DemoComponent {
  dataSource = dataSource;

  tick() {
    this.dataSource.tick();
  }

  ngAfterViewChecked() {
    console.log('demo view checked')
  }
}
