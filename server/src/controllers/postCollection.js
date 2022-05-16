const mongoose = require('../utils/mongoose')
const User = require('../models/userModel')
const Collection = require('../models/collectionModel')
const Item = require('../models/itemModel')
const Tag = require('../models/tagModel')

async function postCollection(request, response) {
    let items = JSON.parse(request.body.items)
    const collectionId = new mongoose.Types.ObjectId()
    let preview = null
    items = items.map(item => {
        item.properties.forEach(property => {
            if (property.type === 'image') {
                let path = request.files.shift().path
                console.log(path)
                property.value = path.replace('uploads', '').replace(/\\/g, '/')
                if (preview == null) {
                    preview = property.value
                }
            }
        })
        return new Item({
            _id: new mongoose.Types.ObjectId(),
            title: item.title,
            properties: item.properties,
            collectionRef: collectionId
        })
    })
    const collection = new Collection({
        _id: collectionId,
        title: request.body.title,
        tags: request.body.tags.length > 0 ? request.body.tags.split(',') : [],
        category: request.body.category,
        description: request.body.description,
        user: response.locals.token.uid,
        preview: preview,
        items: items.map(item => item._id)
    })
    User.findByIdAndUpdate(response.locals.token.uid, {$push: {collections: collectionId}}, {upsert: true})
        .lean().exec()
    collection.save()
    items.forEach(item => item.save())
    request.body.tags.split(',').forEach(tag => {
        Tag.findOneAndUpdate({tag: tag}, {$inc: {'popularity': 1}}).lean().exec()
    })
    response.sendStatus(200)
}

module.exports = postCollection
