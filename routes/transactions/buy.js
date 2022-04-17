const { Nfts, Collections, MarketLogs } = require('../../src/db/models');
const { Op } = require('sequelize');

const Web3 = require("web3");
require('dotenv').config();

const ApiKey = process.env.INFURA_PROJECTID;
const rpcURL = `https://ropsten.infura.io/v3/${ApiKey}`;

const web3 = new Web3(rpcURL);

module.exports = async (req, res) => {

    const data = req.body;
    
    // 요청 바디 체크
    if (!data.nftId || !data.transactionHash || !data.buyerAccount || !data.onMarketLogId) {
        return res.status(422).send("Validation Error");
    };

    // 정상적인 구매 처리인지 확인
    // 정상적인 토큰인가?
    const nft = await Nfts.findByPk(data.nftId);
    if (!nft) {
        return res.status(422).send("NFT not found");
    };

    // marketLogId 는 이 토큰의 것이고 판매중인가?
    const marketLog = await MarketLogs.findByPk(data.onMarketLogId);
    if (!marketLog) {
        return res.status(422).send("MarketLog not found");
    }
    else if (marketLog.nftId !== data.nftId) {
        return res.status(404).send("Wrong Biding");
    }
    else if (marketLog.status_code !== 1 && marketLog.status_code !== 3) {
        return res.status(404).send("Wrong MarketLog");
    }
    // transactionHash 값이 혹시 중복된 값은 아닌가?
    const alExTx = await MarketLogs.findOne({ where: { transaction_hash: data.transactionHash } });
    if (alExTx) {
        return res.status(422).send("Duplicate TransactionHash");
    };

    // 블록체인 네트워크에서 트렌젝션 확인 (nft, 지불) // 당장 이 서비스에서는 불필요한 과정이지만 백서버에서 검증해보고 싶어서 넣어봄
    // 사용하고 싶을때만 .env 에 ApiKey 기입하기
    if (ApiKey) {
        const txHs = await web3.eth.getTransaction(data.transactionHash);
        if (!txHs) {
            return res.status(422).send("Transaction not found on Network");
        }
        else {
            // 구매자 판매자 검사
            const checkerByAddress = txHs.from !== data.buyerAccount && txHs.to === data.buyerAccount && txHs.from === marketLog.seller_account;
            if (!checkerByAddress) {
                return res.status(422).send("Error: Wrong buyer or seller");
            }
            // 지불 금액 검사 (여기서는 ETH 라고 가정하고 진행한다. 나중에 다른 결제수단이 생기면 )
            const checkerByPrice = txHs.value === (marketLog.price * 1000000000000000000n).toString();
            if (!checkerByPrice) {
                return res.status(422).send("Error: Wrong Payment");
            }
        }
    };

    // Nfts 업데이트
    let updatedNft;
    try {
        await Nfts.update(
            { owner_account: data.buyerAccount },
            { where: { id: data.nftId } }
        ).then( async () => {
            return updatedNft = await Nfts.findByPk(data.nftId);
        })
    } catch (err) {
        return res.status(err.status || 500).send({message: err.message || 'failed to update nft on DB'});
    }

    // MarketLogs 업데이트
    let updatedMarketLog;
    try {
        updatedMarketLog = await MarketLogs.findByPk(data.onMarketLogId)
            .then( async (marketLog) => { await marketLog.increment('status_code', { by: 1 }); await marketLog.reload(); return marketLog; })
            .then(marketLog => { marketLog.update({
                    buyer_account: data.buyerAccount,
                    transaction_hash: data.transactionHash,
                    transactedAt: new Date()
                });
                return marketLog;
            });
    } catch (err) {
        return res.status(err.status || 500).send({message: err.message || 'failed to update marketlog on DB'});
    }

    const payload = {updatedNft : updatedNft, updatedMarketLog : updatedMarketLog};

    res.status(200).send({data : payload, message: 'Successful Response'});

};