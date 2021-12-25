import { ConnectionStatus, WalletStatus } from "./status.type";

export class Solana {
  publicKey: string;
  wallet: WalletStatus
  connection: ConnectionStatus



  /**
   *
   */
  constructor(solana: any) {

    this.setWalletStatus(solana);
    this.setConnectionStatus(solana);
  }

  private setWalletStatus(solana: any) {
    if (solana == undefined) {
      this.wallet = WalletStatus.walletNotFound;
    } else if (solana?.isPhantom) {
      this.wallet = WalletStatus.walletIsPhantom;
    } else {
      this.wallet = WalletStatus.walletNotPhantom;
    }
  }

  private setConnectionStatus(solana: any) {
    if (solana?.isConnected) {
      this.connection = ConnectionStatus.connected;
      this.publicKey = solana.publicKey.toString();
    } else {
      this.connection = ConnectionStatus.disconnected;
      this.publicKey = '';
    }
  }
}
