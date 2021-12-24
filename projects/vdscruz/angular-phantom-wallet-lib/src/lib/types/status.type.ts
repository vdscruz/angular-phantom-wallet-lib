enum WalletStatus {
  walletNotFound = 'sem-carteira',
  walletNotPhantom = 'carteira-diferente-phantom',
  walletIsPhantom = 'carteira-phantom'
}

enum ConnectionStatus {
  connected = 'carteira-conectada',
  disconnected = 'carteira-desconectada',
}

enum errStatus {
  _4001 = '[4001] User rejected the request'
}

export {
  WalletStatus, ConnectionStatus
}
