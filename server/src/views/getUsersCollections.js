const Collection = require('../models/collectionModel')

async function fetchUsersCollections(request, response) {
    const collections = await Collection.find({ user: request.query.uid })
        .select('-user -__v').lean().exec()
    response.json(collections)
}

module.exports = fetchUsersCollections
