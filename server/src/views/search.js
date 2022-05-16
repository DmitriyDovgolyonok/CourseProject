const Collection = require('../models/collectionModel')
const Comment = require('../models/commentModel')
const Item = require('../models/itemModel')

async function getCollection(request, response) {
    let map = new Map()
    let result = await Collection
        .find({$text: {$search: request.query.search}}).select('-__v').lean().exec()
    result.forEach(value => map.set(value._id, value))
    result = await Comment
        .find({$text: {$search: request.query.search}}).select('-_id collectionRef').populate('collectionRef', '-__v').lean().exec()
    result.forEach(value => map.set(value.collectionRef._id, value.collectionRef))
    result = await Item
        .find({$text: {$search: request.query.search}}).select('-_id collectionRef').populate('collectionRef', '-__v').lean().exec()
    result.forEach(value => map.set(value.collectionRef._id, value.collectionRef))
    response.json(Array.from(map.values()))
}

module.exports = getCollection
