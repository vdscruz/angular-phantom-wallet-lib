import { DOCUMENT } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PhantomWalletService } from '../../phantom-wallet.service';
import { ConnectionStatus, WalletStatus } from '../../types/status.type';
import { Solana } from './../../types/solana.type';




@Component({
  selector: 'pwl-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  @Input() type?: string = 'text';
  @Input() success?: string = 'Phantom is here';
  @Input() error?: string = 'Phantom not installed install now';

  solana: Solana;

  wallet_not_found: WalletStatus = WalletStatus.walletNotFound;
  wallet_not_phantom: WalletStatus = WalletStatus.walletNotPhantom;
  wallet_is_phantom: WalletStatus = WalletStatus.walletIsPhantom;

  connected: ConnectionStatus = ConnectionStatus.connected;
  disconnected: ConnectionStatus = ConnectionStatus.disconnected;

  constructor(private pwService: PhantomWalletService) {
    pwService.Solana.subscribe(value => {
      this.solana = value;
    });
  }

  ngOnInit(): void {

  }

}
