'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('MarketLogs',
     [
       // 가상의 account
       // 민팅한놈: 0x0000000000000000000000000000000000000000
       // 싹 구매하고 에어드랍까지 받은 놈: 0x08A46De58d48920448D4e909020FE1560f0c411A
       // 2차 거래자들 0x0006700000000 , 0x000000005578760000 , 0x0000007635005578760000
       {
        id: 1,
        nft_id: 1,
        seller_account: '0x0000000000000000000000000000000000000000',
        sale_price: 0.01,
        sale_token: "ETH",
        status_code: 4,
        buyer_account: '0x08A46De58d48920448D4e909020FE1560f0c411A',
        transaction_hash: '0x1',
        transactedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        id: 2,
        nft_id: 2,
        seller_account: '0x0000000000000000000000000000000000000000',
        sale_price: 0.01,
        sale_token: "ETH",
        status_code: 4,
        buyer_account: "0x08A46De58d48920448D4e909020FE1560f0c411A",
        transaction_hash: "0x2",
        transactedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        nft_id: 3,
        seller_account: '0x0000000000000000000000000000000000000000',
        sale_price: 0.01,
        sale_token: "ETH",
        status_code: 4,
        buyer_account: '0x08A46De58d48920448D4e909020FE1560f0c411A',
        transaction_hash: '0x3',
        transactedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        nft_id: 4,
        seller_account: '0x0000000000000000000000000000000000000000',
        sale_price: 0.01,
        sale_token: "ETH",
        status_code: 3,
        buyer_account: null,
        transaction_hash: null,
        transactedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        nft_id: 5,
        seller_account: '0x0000000000000000000000000000000000000000',
        sale_price: 0.01,
        sale_token: "ETH",
        status_code: 3,
        buyer_account: null,
        transaction_hash: null,
        transactedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        nft_id: 6,
        seller_account: '0x0000000000000000000000000000000000000000',
        sale_price: 0.01,
        sale_token: "ETH",
        status_code: 3,
        buyer_account: null,
        transaction_hash: null,
        transactedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        nft_id: 7,
        seller_account: '0x0000000000000000000000000000000000000000',
        sale_price: 0.01,
        sale_token: "ETH",
        status_code: 3,
        buyer_account: null,
        transaction_hash: null,
        transactedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        nft_id: 8,
        seller_account: '0x0000000000000000000000000000000000000000',
        sale_price: 0,
        sale_token: "ETH",
        status_code: 5,
        buyer_account: "0x08A46De58d48920448D4e909020FE1560f0c411A",
        transaction_hash: "0x0000000000000000000000000000000000000000000000000000000000000000",
        transactedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        nft_id: 1,
        seller_account: '0x08A46De58d48920448D4e909020FE1560f0c411A',
        sale_price: 0.05,
        sale_token: "ETH",
        status_code: 2,
        buyer_account: "0x0006700000000",
        transaction_hash: "0x9",
        transactedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        nft_id: 1,
        seller_account: '0x0006700000000',
        sale_price: 0.08,
        sale_token: "ETH",
        status_code: 2,
        buyer_account: "0x000000005578760000",
        transaction_hash: "0x10",
        transactedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        nft_id: 3,
        seller_account: '0x08A46De58d48920448D4e909020FE1560f0c411A',
        sale_price: 0.1,
        sale_token: "ETH",
        status_code: 2,
        buyer_account: "0x0000007635005578760000",
        transaction_hash: "0x11",
        transactedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        nft_id: 1,
        seller_account: '0x000000005578760000',
        sale_price: 0.12,
        sale_token: "ETH",
        status_code: 1,
        buyer_account: null,
        transaction_hash: null,
        transactedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        nft_id: 2,
        seller_account: '0x08A46De58d48920448D4e909020FE1560f0c411A',
        sale_price: 0.15,
        sale_token: "ETH",
        status_code: 1,
        buyer_account: null,
        transaction_hash: null,
        transactedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
     ], {});
   },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('MarketLogs', null, {});
  }
};
