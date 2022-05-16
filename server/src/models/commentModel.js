const mongoose = require('../utils/mongoose')

const CommentSchema = mongoose.Schema({
    user: { type: String, ref: 'User' },
    collectionRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection' },
    comment: { type: String }
})

CommentSchema.index({ '$**': 'text' })

const Comment = mongoose.model('Comment', CommentSchema, 'comments')

module.exports = Comment