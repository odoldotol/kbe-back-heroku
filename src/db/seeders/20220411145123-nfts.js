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
    await queryInterface.bulkInsert('Nfts',
    [
      {
        id: 1,
        collections_id: 1,
        ipfs: "https://ipfs.io/ipfs/bafkreiclclq6i2q3loufm23uobd265u2s3krkpuyqe3gdwg6na6g6ksgwm",
        creater_account: "0x0000000000000000000000000000000000000000",
        owner_account: "0x000000005578760000",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        collections_id: 2,
        ipfs: "https://ipfs.io/ipfs/bafkreibixo6lwqjpyadygj2hrmmdbgaqvqgcg5cram4qvjiolrdw3bwaku",
        creater_account: "0x0000000000000000000000000000000000000000",
        owner_account: "0x08A46De58d48920448D4e909020FE1560f0c411A",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        collections_id: 3,
        ipfs: "https://ipfs.io/ipfs/bafkreidarrd7vzvupza2qjzpl4vlwdcs4xyemsfvqhd6fukgvyamfodnvm",
        creater_account: "0x0000000000000000000000000000000000000000",
        owner_account: "0x0000007635005578760000",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        collections_id: 1,
        ipfs: "https://ipfs.io/ipfs/bafkreiakqf4hbmdtui4ssv5sgj4ksantwcyexczkg7vyxkgbkaehpk6sba",
        creater_account: "0x0000000000000000000000000000000000000000",
        owner_account: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        collections_id: 2,
        ipfs: "https://ipfs.io/ipfs/bafkreiat3sq2i57434xmjceccf26pfytlomvg7274vo7lh57sketzsxv6e",
        creater_account: "0x0000000000000000000000000000000000000000",
        owner_account: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        collections_id: 3,
        ipfs: "https://ipfs.io/ipfs/bafkreiftt4b5u5hu2xa6acn3opwiooa26fpxho5m637zvchypw5ebfj2k4",
        creater_account: "0x0000000000000000000000000000000000000000",
        owner_account: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        collections_id: 1,
        ipfs: "https://ipfs.io/ipfs/bafkreigt2lt4bbaq4izy44pu2o7ldyt6z6sivamkvkscbwp2vzju6tlzyy",
        creater_account: "0x0000000000000000000000000000000000000000",
        owner_account: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        collections_id: 2,
        ipfs: "https://ipfs.io/ipfs/bafkreiat6undt33cd2ej3mfiaacqnsqxlvr2533htzrsu4zed6nkwfgu5e",
        creater_account: "0x0000000000000000000000000000000000000000",
        owner_account: "0x08A46De58d48920448D4e909020FE1560f0c411A",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        collections_id: 2,
        ipfs: "https://ipfs.io/ipfs/bafkreifrg3nmkdnqmls66liuhq35sfw5dxcqodxmsflgxj5bdnjslfdeem",
        creater_account: "0x0000000000000000000000000000000000000000",
        owner_account: "0x0000000000000000000000000000000000000000",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        collections_id: 1,
        ipfs: "https://ipfs.io/ipfs/bafkreibzxwdpnyu34pxt74trphzy42kxlcjwmqwhz4mbmv4wtih6wgoece",
        creater_account: "0x0000000000000000000000000000000000000000",
        owner_account: "0x0000000000000000000000000000000000000000",
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
    await queryInterface.bulkDelete('Nfts', null, {});
  }
};
