import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularPhantomWalletLibModule } from '@vdscruz/angular-phantom-wallet-lib';
import { PhantomWalletService } from 'projects/vdscruz/angular-phantom-wallet-lib/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularPhantomWalletLibModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
