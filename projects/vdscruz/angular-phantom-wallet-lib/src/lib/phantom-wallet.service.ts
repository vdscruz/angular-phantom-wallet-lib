import { EventEmitter, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { interval, Observable, Subject, Subscription, BehaviorSubject } from 'rxjs';
import { Solana } from './types/solana.type';

@Injectable({
  providedIn: 'root'
})
export class PhantomWalletService {

  private readonly SOLANA_OBJECT = 'solana';
  private readonly document;
  private readonly subscription: Subscription;
  private solana: any;
  private bs: BehaviorSubject<Solana> = new BehaviorSubject(null);

  constructor(@Inject(DOCUMENT) private doc: Document) {
    this.document = doc;

    const source = interval(10000);
    this.subscription = source.subscribe(val => {
      if (this.solana == undefined) {
        this.solana = this.document.defaultView[this.SOLANA_OBJECT]
        this.bs.next(new Solana(this.solana));
      }

      if (this.solana != undefined) {
        this.subscription.unsubscribe();
      }
    });
  }

  get Solana() {
    return this.bs.asObservable();
  }

  async connect() {
    if (this.solana && this.solana.isPhantom) {
      var resp = await this.solana.connect();
      this.bs.next(new Solana(this.solana));
    }
  }

  async disconnect() {
    if (this.solana && this.solana.isPhantom) {
      var resp = await this.solana.disconnect();
      this.bs.next(new Solana(this.solana));
    }
  }
}
