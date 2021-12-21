enum WalletStatus {
  walletNotFound = 'sem-carteira',
  walletNotPhantom = 'carteira-diferente-phantom',
  walletIsPhantom = 'carteira-phantom'
}

enum ConnectionStatus {
  connected = 'carteira-conectada',
  disconnected = 'carteira-desconectada',
}

export {
  WalletStatus, ConnectionStatus
}
