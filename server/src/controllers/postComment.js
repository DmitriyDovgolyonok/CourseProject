const Comment = require('../models/commentModel')

async function postComment(request, response, next) {
    new Comment({
        user: request.body.uid,
        collectionRef: request.body.id,
        comment: request.body.text
    })
        .save()
    response.sendStatus(200)
    next()
}

module.exports = postComment
