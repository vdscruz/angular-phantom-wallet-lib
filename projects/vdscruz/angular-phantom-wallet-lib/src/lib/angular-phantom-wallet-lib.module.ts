import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { StatusComponent } from './components/status/status.component';
import { ConnectWalletComponent } from './components/connect-wallet/connect-wallet.component';
import { PhantomWalletService } from './services/phantom-wallet.service';


@NgModule({
  declarations: [
    StatusComponent,
    ConnectWalletComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StatusComponent,
    ConnectWalletComponent,
  ]
})
export class AngularPhantomWalletLibModule {
  static forRoot(): ModuleWithProviders<AngularPhantomWalletLibModule> {
    return {
      ngModule: AngularPhantomWalletLibModule,
      providers: [PhantomWalletService]
    }
  }
}
