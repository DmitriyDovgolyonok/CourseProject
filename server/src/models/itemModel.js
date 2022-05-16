const mongoose = require('../utils/mongoose')

const ItemPropertySchema = mongoose.Schema({
    type: String,
    title: { type: String },
    value: { type: String }
})

ItemPropertySchema.index({ '$**': 'text' })

const ItemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: { type: Date, default: Date.now },
    title: String,
    properties: [ItemPropertySchema],
    collectionRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }
})

ItemSchema.index({ '$**': 'text' })

const Item = mongoose.model('Item', ItemSchema, 'items')

module.exports = Item
