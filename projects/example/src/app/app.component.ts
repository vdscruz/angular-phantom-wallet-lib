import { Component } from '@angular/core';
import { ConnectionStatus, PhantomWalletService, Solana } from '@vdscruz/angular-phantom-wallet-lib';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  sub: Subscription;
  solana: Solana = undefined;
  connected: ConnectionStatus = ConnectionStatus.connected;
  constructor(private pwService: PhantomWalletService) {
    this.sub = this.pwService.Solana.subscribe((solana) => {
      this.solana = solana;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
