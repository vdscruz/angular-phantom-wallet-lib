import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { Solana } from './types/solana.type';
import { Connection, Transaction } from '@solana/web3.js';

@Injectable({
  providedIn: 'root'
})
export class PhantomWalletService {

  private readonly SOLANA_OBJECT = 'solana';
  private readonly NETWORK = 'devnet';
  private readonly document;
  private readonly subscription: Subscription;
  private solana: any;
  private sub: Subject<Solana> = new Subject();

  constructor(@Inject(DOCUMENT) private doc: Document) {
    this.document = doc;

    const source = interval(10000);
    this.subscription = source.subscribe(val => {
      if (this.solana == undefined) {
        this.solana = this.document.defaultView[this.SOLANA_OBJECT]
        this.sub.next(new Solana(this.solana));
      }

      if (this.solana != undefined) {
        this.subscription.unsubscribe();
      }
    });
  }

  get Solana() {
    return this.sub.asObservable();
  }

  get Network() {
    return this.NETWORK;
  }

  async connect() {
    if (this.solana && this.solana.isPhantom) {
      var resp = await this.solana.connect();
      this.sub.next(new Solana(this.solana));
    }
  }

  async disconnect() {
    if (this.solana && this.solana.isPhantom) {
      var resp = await this.solana.disconnect();
      this.sub.next(new Solana(this.solana));
    }
  }

  async sendTransaction() {
    return new Observable(subs => {
      const connection = new Connection(this.Network);
      const transaction = new Transaction();
      //const { signature } = await this.solana.signAndSendTransaction(transaction);
      //await connection.confirmTransaction(signature);
      this.solana.signAndSendTransaction(transaction)
        .then((signature: any) => {
          connection.confirmTransaction(signature)
            .then(value => {
              subs.next(value);
              subs.complete()
            })
        })
    });

  }
}
