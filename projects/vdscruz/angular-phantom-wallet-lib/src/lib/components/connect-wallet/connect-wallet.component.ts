import { Component, Input, OnInit } from '@angular/core';
import { PhantomWalletService } from '../../phantom-wallet.service';
import { Solana } from '../../types/solana.type';
import { ConnectionStatus } from '../../types/status.type';


@Component({
  selector: 'pwl-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.css']
})
export class ConnectWalletComponent implements OnInit {

  @Input() class?: string;

  solana: Solana;
  connected: ConnectionStatus = ConnectionStatus.connected;
  disconnected: ConnectionStatus = ConnectionStatus.disconnected;

  constructor(private pwService: PhantomWalletService) {
    pwService.Solana.subscribe(value => {
      this.solana = value;
    });
  }

  ngOnInit(): void {
  }

  connect() {
    this.pwService.connect();
  }

  disconnect() {
    this.pwService.disconnect();
  }

}
