const mongoose = require('../utils/mongoose')

const CategorySchema = mongoose.Schema({
    category: String
})

const Category = mongoose.model('Category', CategorySchema, 'categories')

module.exports = Category
