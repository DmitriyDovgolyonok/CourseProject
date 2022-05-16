const Tag = require('../models/tagModel')

async function getPopularTags(request, response) {
    const tags = await Tag.find()
        .select('-_id -__v').sort('-popularity').limit(10).lean().exec()
    response.json(tags)
}

module.exports = getPopularTags
