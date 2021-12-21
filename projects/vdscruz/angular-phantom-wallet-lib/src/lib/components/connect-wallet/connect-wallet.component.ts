import { Component, Input, OnInit } from '@angular/core';
import { PhantomWalletService } from '../../phantom-wallet.service';
import { Solana } from '../../types/solana.type';
import { ConnectionStatus } from '../../types/status.type';
import { Subscription } from 'rxjs';


@Component({
  selector: 'pwl-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.css']
})
export class ConnectWalletComponent implements OnInit {

  @Input() class?: string;

  private sub: Subscription;
  solana: Solana;
  connected: ConnectionStatus = ConnectionStatus.connected;
  disconnected: ConnectionStatus = ConnectionStatus.disconnected;

  constructor(private pwService: PhantomWalletService) {
    this.sub = pwService.Solana.subscribe(value => {
      this.solana = value;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  connect() {
    this.pwService.connect();
  }

  disconnect() {
    this.pwService.disconnect();
  }

}
