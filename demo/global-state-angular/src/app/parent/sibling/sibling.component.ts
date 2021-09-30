import { Component } from '@angular/core';
import dataSource from '~/dataSource';

@Component({
  selector: 'sibling',
  template: `
    <p>
      sibling
      <button (click)="tick()">count {{dataSource.count}}</button>
    </p>
  `,
  styles: []
})
export class SiblingComponent {

  dataSource = dataSource;

  tick() {
    this.dataSource.tick();
  }

  ngAfterViewChecked() {
    console.log('sibling view checked')
  }
}
