const Tag = require('../models/tagModel')

async function postTag(request, response) {
    new Tag({
        tag: request.body.tag, popularity: 0
    })
        .save()
    response.sendStatus(200)
}

module.exports = postTag
