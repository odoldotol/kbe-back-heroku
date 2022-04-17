const { Nfts, Collections, MarketLogs } = require('../../src/db/models');

// 요청이 오면 앤드포인트에 따라서 그리고 쿼리 스트링에 따라서 nft 를 응답으로 보내줌
module.exports = async (req, res) => {

    // 엔드포인트에는 콜렉션 id 가 포함되어있음
    const col_id = req.params.col_id;
    
    // 0이면 전부 조회하고 1 이상이면 그에 맞는 콜렉션에 속한 nft 를 응답해줌
    if (col_id == 0) {
        let nfts = await Nfts.findAll();

        // 쿼리에 어카운트 있으면 이를 조건으로 필터링 함
        if (req.query.account) {
            nfts = filterByAccount(nfts, req.query.account);
        }

        const collections = await Collections.findAll();
        const marketlogs = await MarketLogs.findAll();

        const payload = makePayload(nfts, collections, marketlogs);

        res.status(200).send({data : payload, message: 'Successful Response'});
    }
    else {
        let nfts = await Nfts.findAll({
            where: {
                collections_id: col_id
            }
        });

        // 쿼리에 어카운트 있으면 이를 조건으로 필터링 함
        if (req.query.account) {
            nfts = filterByAccount(nfts, req.query.account);
        }

        if (nfts.length > 0) {

            const collections = await Collections.findAll();
            // 클론코딩이고 데이터가 얼마 없어서 nft 마다 쿼리 날리는것보다 그냥 다 가져와서 필터링해서 쓰는게 편할듯.
            const marketlogs = await MarketLogs.findAll();

            const payload = makePayload(nfts, collections, marketlogs);

            res.status(200).send({data : payload, message: 'Successful Response'});
        }
        else {
            res.status(404).send('No nfts found');
        }
    }
};

// payload 만드는 함수
// Nfts, Collections, MarketLogs 3 가지 DB 테이블에서 프론트가 테이터 이용하기 좋게 분류하여 nft 별로 담아줘여한다.
function makePayload(nfts, collections, marketlogs) {

    // 기본적으로는 응답해줄 nfts 에 맵함수를 돌려서 만듦.
    const result = nfts.map(nft => {

        // 각 nft 객체마다 콜렉션 데이터도를 포함시켜줄것임
        const collection = collections.find(collection => collection.dataValues.id == nft.dataValues.collectionId);
        // 각 nft 객체마다 마켓 로그 데이터를 이용하여 토큰별 sale 데이터와 토큰별 민팅, 거래내역 기록 등이 담긴 객체배열을 함께 응답할것임. 
        const filtered_marketlogs = marketlogs.filter(marketlog => marketlog.dataValues.nftId == nft.dataValues.id);

        // omMarket 은 토큰이 현재 시장에서 어떤 상태인지 표현하는 데이터임 (0 : 시장에 없음, 1 : 판매중, 3 : 민팅중)
        let onMarket = 0;
        // 마텟 로그 데이터테이블에 각 토큰별로 판매중이거나 민팅중인 로그는 하나만 존재하는게 정상인데, 그렇지 않은 경우가 있는지, payload 를 만드는 과정마다 찾아볼 것임.
        let onMarket_integrity_checker = false;
        // map 함수를 통해서 데이터를 다듬으면서 체크를 한다.
        const marketlogs_payload = filtered_marketlogs.map(marketlog => {

            // 1 이나 3 이면 sale 중인 로그다.
            if (marketlog.dataValues.status_code == 1 || marketlog.dataValues.status_code == 3) {
                onMarket = marketlog.dataValues.status_code;

                // sale 중인 로그가 1개 초과면 문제가 있다. 하지만, 우선은 최신 로그를 보여줄 것으로 해결하고, DB 에 문제가 있다는것을 콜솔에 찍어주기만 하고 넘어가겠다.
                if (onMarket_integrity_checker == true) {
                    console.log(`there is a integrity Issue of MarketLogs at (id : ${marketlog.dataValues.id})`);
                };

                onMarket_integrity_checker = true;
            };

            return {
                id: marketlog.dataValues.id,
                nftId: marketlog.dataValues.nftId,
                seller_account: marketlog.dataValues.seller_account,
                sale_price: marketlog.dataValues.sale_price,
                sale_token: marketlog.dataValues.sale_token,
                status_code: marketlog.dataValues.status_code,
                buyer_account: marketlog.dataValues.buyer_account,
                transaction_hash: marketlog.dataValues.transaction_hash,
                transactedAt: marketlog.dataValues.transactedAt
            }
        });

        // sale 중인 로그
        // 0 이 아니면 slae 중인 로그가 있는것이고 복수일 가능성을을 배제하지 않기로 하였으니 배열에 담는다.
        let onMarketLog = [];
        if (onMarket !== 0) {
            onMarketLog = marketlogs_payload.filter(marketlog => marketlog.status_code === onMarket);
        }

        // history 만들기
        // 2 : 판매완료된 로그, 4 : 민팅완료된 로그, 5 : 에어드랍 로그 객채들로만 구성된 배열을 따로 만든다.
        const history = marketlogs_payload.filter(marketlog => marketlog.status_code === 2 || marketlog.status_code === 4 || marketlog.status_code === 5);
        
        // last_price 만들기 // while 과 if 를 써서 return 으로 null 주면서 찾느게 편해서 즉시실행함수 사용. 
        let last_price = (() => {
            // history가 없으면 null
            if (history.length === 0) {
                return null;
            }
            // 뒤에서 부터 확인하하면서 에어드랍(5) 이 아닌 의미있는 거래완료로그를 찾기.
            let i = 1;
            // 돌다가 찾으면 와일문 빠져나오기
            while (history[history.length - i].status_code === 5) { 
                // 끝까지 돌았는데 못찾았으면 null
                if (history.length - i === 0) {
                    return null;
                }
                i++;
            };
            // 찾았으면 찾은 로그의 가격을 리턴
            return history[history.length - i].sale_price;
        })();

        // 결론적으로 각각의 nft 정보는 아래와 같은 모양의 객체가 된다.
        return {
            id: nft.id,
            collection_id: collection.dataValues.id,
            collection_name: collection.dataValues.name,
            collection_description: collection.dataValues.description,
            collection_image: collection.dataValues.image,
            ipfs: nft.ipfs,
            creater_account: nft.creater_account,
            owner_account: nft.owner_account,
            onMarket: onMarket,
            onMarketLog: onMarketLog[onMarketLog.length-1], // 복수일 가능성을 배제하지 않고 이렇게 마지막 하나의 로그만 보여주는 식이다.
            last_price: last_price,
            history: history // 히스토리 로그들이 담긴 배열
        }
    });
    return result;
}


function filterByAccount (nfts, account) {
    return nfts.filter(nft => nft.owner_account === account);
}