const mongoose = require('../utils/mongoose')

const LikeSchema = mongoose.Schema({
    user: { type: String, ref: 'User' },
    collectionRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }
})

const Like = mongoose.model('Like', LikeSchema, 'likes')

module.exports = Like