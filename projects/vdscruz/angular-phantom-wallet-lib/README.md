# AngularPhantomWalletLib

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.2.

## Getting started

Install the library using npm.

Angular version: 12

```
npm i @vdscruz/angular-phantom-wallet-lib
```

## Example use

AppModule.ts

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AngularPhantomWalletLibModule } from "@vdscruz/angular-phantom-wallet-lib";

import { AppComponent } from "./app.component";

@NgModule({
  imports: [BrowserModule, AngularPhantomWalletLibModule.forRoot()],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

polyfills.ts

```ts
/***************************************************************************************************
 * APPLICATION IMPORTS
 */
(window as any)["global"] = window;
```
