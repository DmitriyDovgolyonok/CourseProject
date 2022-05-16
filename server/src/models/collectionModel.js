const mongoose = require('../utils/mongoose')

const CollectionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: { type: Date, default: Date.now },
    title: { type: String },
    tags: { type: [String] },
    category: { type: String },
    description: { type: String },
    preview: String,
    user: { type: String, ref: 'User' },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
})

//CollectionSchema.index({ title: 'text', tags: 'text', description: 'text' })
CollectionSchema.index({ '$**': 'text' })

//CollectionSchema.pre('deleteOne', { document: true, query: false }, next => {
//    console.log(this)
//    next()
//})

const Collection = mongoose.model('Collection', CollectionSchema, 'collections')

module.exports = Collection
