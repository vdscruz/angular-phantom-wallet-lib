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
  msg?: any;

  constructor(private pwService: PhantomWalletService) {
    this.sub = this.pwService.Solana.subscribe((solana) => {
      this.solana = solana;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  sendTestValue() {
    this.msg = 'Send 0.002 SOL to AqJtgkS79MzyXaxJNoPFbXartCRyHikDj1S2MBebSmVG'
    this.pwService.sendSol("AqJtgkS79MzyXaxJNoPFbXartCRyHikDj1S2MBebSmVG", 0.002).then(result => {
      if (result.success) {
        this.msg = 'Transfer successful'
      } else {
        this.msg = result.err.message;
      }
    })
  }
}
