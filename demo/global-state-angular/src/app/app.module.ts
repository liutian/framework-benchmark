import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OtherParentComponent } from './other-parent/other-parent.component';
import { ChildAComponent } from './parent/demo/child-a/child-a.component';
import { ChildBComponent } from './parent/demo/child-b/child-b.component';
import { DemoComponent } from './parent/demo/demo.component';
import { ParentComponent } from './parent/parent.component';
import { SiblingComponent } from './parent/sibling/sibling.component';

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    OtherParentComponent,
    DemoComponent,
    ChildAComponent,
    ChildBComponent,
    SiblingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
