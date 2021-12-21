import { Component } from '@angular/core';
import { PhantomWalletService } from 'projects/vdscruz/angular-phantom-wallet-lib/src/lib/phantom-wallet.service';
import { Solana } from 'projects/vdscruz/angular-phantom-wallet-lib/src/lib/types/solana.type'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  solana: Solana;
  constructor(private pwService: PhantomWalletService) {
    this.pwService.Solana.pipe().subscribe((solana) => {
      this.solana = solana;
    });
  }
}
