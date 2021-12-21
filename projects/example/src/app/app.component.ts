import { Component } from '@angular/core';
import { PhantomWalletService } from 'projects/vdscruz/angular-phantom-wallet-lib/src/lib/phantom-wallet.service';
import { Solana } from 'projects/vdscruz/angular-phantom-wallet-lib/src/lib/types/solana.type'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  sub: Subscription;
  solana: Solana;
  constructor(private pwService: PhantomWalletService) {
    this.sub = this.pwService.Solana.subscribe((solana) => {
      this.solana = solana;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
