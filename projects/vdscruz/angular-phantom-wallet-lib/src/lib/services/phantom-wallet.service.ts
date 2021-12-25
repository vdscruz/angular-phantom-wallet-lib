import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { interval, Subject, Subscription } from 'rxjs';
import { Solana } from '../types/solana.type';
import {
  Connection, clusterApiUrl, PublicKey,
  SystemProgram, TransactionInstruction,
  Transaction, LAMPORTS_PER_SOL
} from '@solana/web3.js'

@Injectable({
  providedIn: 'root'
})
export class PhantomWalletService {

  private readonly SOLANA_OBJECT = 'solana';
  private readonly NETWORK = clusterApiUrl('devnet');
  private readonly document;
  private readonly subscription: Subscription;
  private provider!: any;
  private sub: Subject<Solana> = new Subject();
  private connection!: Connection;

  constructor(@Inject(DOCUMENT) private doc: Document) {
    this.document = doc;

    const source = interval(100);
    this.subscription = source.subscribe(val => {
      if (this.provider == undefined) {
        this.provider = this.document.defaultView[this.SOLANA_OBJECT]
        this.sub.next(new Solana(this.provider));
      }

      if (this.provider != undefined) {
        this.subscription.unsubscribe();
      }
    });
  }

  get Solana() {
    return this.sub.asObservable();
  }

  get Connection() {
    return this.connection;
  }

  async connect(): Promise<any> {
    let result: Solana = undefined;
    if (this.provider && this.provider.isPhantom) {
      await this.provider.connect();
      this.connection = new Connection(this.NETWORK);
      result = new Solana(this.provider);
      this.sub.next(result);
      return { success: true, data: result };
    } else {
      return { success: false, err: 'Phantom is not found' }
    }
  }

  async disconnect(): Promise<any> {
    let result: Solana = undefined;
    if (this.provider && this.provider.isPhantom) {
      await this.provider.disconnect();
      this.connection = undefined;
      result = new Solana(this.provider);
      this.sub.next(result);
      return { success: true, data: result };
    } else {
      return { success: false, err: 'Phantom is not found' }
    }
  }

  async sendSol(to: string, vle: number): Promise<any> {

    try {
      const destPubkey = new PublicKey(to);
      const instruction = SystemProgram.transfer({
        fromPubkey: this.provider!.publicKey!,
        toPubkey: destPubkey,
        lamports: vle * LAMPORTS_PER_SOL,
      });

      let trans = await this.setWalletTransaction(instruction);
      let signature = await this.signAndSendTransaction(this.provider, trans);
      let result = await this.connection.confirmTransaction(signature, "singleGossip");
      return { success: true, data: result };
    } catch (e) {
      return { success: false, err: e };
    }

  }

  private async setWalletTransaction(instruction: TransactionInstruction): Promise<Transaction> {
    const transaction = new Transaction();
    transaction.add(instruction);
    transaction.feePayer = this.provider!.publicKey!;
    let hash = await this.connection.getRecentBlockhash();
    transaction.recentBlockhash = hash.blockhash;
    return transaction;
  }

  private async signAndSendTransaction(
    wallet: any,
    transaction: Transaction
  ): Promise<string> {
    let signedTrans = await wallet.signTransaction(transaction);
    let signature = await this.connection.sendRawTransaction(signedTrans.serialize());
    return signature;
  }
}
