import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularPhantomWalletLibModule } from '@vdscruz/angular-phantom-wallet-lib';
import { PhantomWalletService } from 'projects/vdscruz/angular-phantom-wallet-lib/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AngularPhantomWalletLibModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
