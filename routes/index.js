module.exports = {
  login: require("./wallets/login"),
  logout: require("./wallets/logout"),
  accTokenReq: require("./wallets/accTokenReq"),
  refTokenReq: require("./wallets/refTokenReq"),
  walletAddr: require("./wallets/walletAddr"),
  collections: require("./items/collections"),
  nfts: require("./items/nfts"),
  marketlogs: require("./items/marketlogs"),
  createCollection: require("./items/createCollection"),
  mint: require("./items/mint"),
  buy: require("./transactions/buy"),
};
