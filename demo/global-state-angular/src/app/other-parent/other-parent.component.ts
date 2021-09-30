import { Component } from '@angular/core';
import dataSource from '~/dataSource';

@Component({
  selector: 'other-parent',
  template: `
    <p>
      other-parent
      <button (click)="tick()">count {{dataSource.count}}</button>
    </p>
  `,
  styles: []
})
export class OtherParentComponent {
  dataSource = dataSource;

  tick() {
    this.dataSource.tick();
  }

  ngAfterViewChecked() {
    console.log('other-parent view checked')
  }

}
