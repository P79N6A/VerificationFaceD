import { BrowserModule,BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecordRTCComponent } from './record-rtc/record-rtc.component';


@NgModule({
  declarations: [
    AppComponent,
    RecordRTCComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    // BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }