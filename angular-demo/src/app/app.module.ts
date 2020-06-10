import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PureHtmlComponent } from './pure-html/pure-html.component';
import { FeedComponent } from './feed/feed.component';
import { PureComComponent } from './pure-com/pure-com.component';

@NgModule({
  declarations: [
    AppComponent,
    PureHtmlComponent,
    FeedComponent,
    PureComComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
