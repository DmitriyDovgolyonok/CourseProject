const Category = require('../models/categoryModel')

async function getCategories(request, response) {
    const categories = await Category.find().select('-_id').lean().exec()
    response.send(categories.map(category => category.category))
}

module.exports = getCategories
