const Tag = require('../models/tagModel')

async function getTags(request, response) {
    const tags = await Tag.find()
        .select('-_id -__v').lean().exec()
    response.send(tags.map(tag => tag.tag))
}

module.exports = getTags
