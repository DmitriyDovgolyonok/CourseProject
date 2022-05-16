const Collection = require('../models/collectionModel')

async function getCollectionsByTag(request, response) {
    const collections = await Collection.find({ tags: request.query.tag })
        .select('-user -__v').lean().exec()
    response.json(collections)
}

module.exports = getCollectionsByTag
