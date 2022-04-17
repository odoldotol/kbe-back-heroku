const { Nfts, Collections, MarketLogs } = require('../../src/db/models');

const { Op } = require('sequelize');

// account 로 마켓로그 조회해서 응답주기
module.exports = async (req, res) => {

    const account = req.params.account;

    // account 와 연관된 모든 로그 중에서 판매완료 로그이거나(status_code:2) 민팅완료 로그이거나(4), 에어드립로그(5) 만 조회
    const history = await MarketLogs.findAll({
        where: { [Op.and]: [
            { [Op.or]: [
                {seller_account: account},
                {buyer_account: account}
            ]},
            { [Op.or]: [
                {status_code: 2},
                {status_code: 4},
                {status_code: 5}
            ]}
        ] }
    });

    res.status(200).send({data : history, message: 'Successful Response'});

};