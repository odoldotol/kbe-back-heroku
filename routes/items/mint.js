const { Nfts, Collections, MarketLogs } = require('../../src/db/models');

// 요청이 오면 데이터 받아서 nft 데이터 DB 에 생성하고 민팅 로그 데이터 DB 에 생성함.
module.exports = async (req, res) => {

    const data = req.body;

    // 바디에 담긴 데이터 검증
    if (!data.ipfs || !data.price || !data.account) {
        return res.status(422).send("Validation Error");
    };

    // ipfs 가 유니크 한지 검증
    const ipfs = await Nfts.findOne({ where: { ipfs: data.ipfs } });
    if (ipfs) {
        return res.status(422).send("Duplicate IPFS");
    }

    // 콜렉션을 선택하지 않으면 퍼블릭 컬렉션을 제공
    if (!data.collectionId) {
        const publicCollection = await Collections.findOne({ where: { name: "public0001" } })
        data.collectionId = publicCollection.id;
    }
    
    // 판매 토큰의 기본값은 ETH
    if (!data.saleToken) {
        data.saleToken = "ETH";
    }
    
    // nft 데이터 생성하기
    let createdNft;
    try {
        createdNft = await Nfts.create({
            collectionId: data.collectionId,
            ipfs: data.ipfs,
            creater_account: data.account,
            owner_account: null
        });
    } catch (err) {
        return res.status(err.status || 500).send({message: err.message + ' (failed to create nft on DB)'});
    }

    // 민팅 로그 데이터 생성하기
    let createdMarketLog;
    try {
        createdMarketLog = await MarketLogs.create({
            nftId: createdNft.id,
            seller_account: data.account,
            sale_price: data.price,
            sale_token: data.saleToken,
            status_code: 3,
            buyer_account: null,
            transaction_hash: null,
            transactedAt: null
        });
    } catch (err) {
        return res.status(err.status || 500).send({message: err.message + ' (failed to create marketlog on DB)'});
    }

    // payload 만들기
    const payload = {createdNft : createdNft, createdMarketLog : createdMarketLog};

    res.status(200).send({data : payload, message: 'Successful Response'});
};

// async function createNft(data) {
//     try {
//         return await Nfts.create({
//             collectionId: data.collectionId,
//             ipfs: data.ipfs,
//             creater_account: data.account,
//             owner_account: data.account
//         });
//     } catch (err) {
//         return err
//     }
// }

// async function createMarketLog(data, nft) {
//     return await MarketLogs.create({
//         nftId: nft.id,
//         seller_account: data.account,
//         sale_price: data.price,
//         sale_token: data.saleToken,
//         status_code: 3,
//         buyer_account: null,
//         transaction_hash: null,
//         transactedAt: null
//     });
// }