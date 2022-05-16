const mongoose = require('../utils/mongoose')

const TagSchema = mongoose.Schema({
    tag: String,
    popularity: Number
})

const Tag = mongoose.model('Tag', TagSchema, 'tags')

module.exports = Tag
