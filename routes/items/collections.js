const { Collections } = require('../../src/db/models');

// 요청이 오면 콜렉션 전부 응답으로 보내줌
module.exports = async (req, res) => {

    const collections = await Collections.findAll();
    if (collections) {
        const payload = collections.map(collection => {
            return {
                id: collection.id,
                contract_address: collection.contract_address,
                name: collection.name,
                description: collection.description,
                image: collection.image
            }
        });
        res.status(200).send({data : payload, message: 'Successful Response'});
    } else {
        res.status(404).send('No collections found');
    }
};
