const Collection = require('../models/collectionModel')

async function getCollection(request, response) {
    let collection = await Collection.findOne({ _id: request.query.id })
        .select('-_id -__v').populate('items', '-__v -collectionRef').lean().exec()
    response.json(collection)
}

module.exports = getCollection
