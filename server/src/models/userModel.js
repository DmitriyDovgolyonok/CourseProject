const mongoose = require('../utils/mongoose')

const UserSchema = mongoose.Schema({
    _id: String,
    name: String,
    admin: Boolean,
    blocked: Boolean,
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }]
})

const User = mongoose.model('User', UserSchema, 'users')

module.exports = User