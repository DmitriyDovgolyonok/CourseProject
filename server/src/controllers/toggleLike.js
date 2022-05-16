const Like = require('../models/likeModel')

async function toggleLike(request, response, next) {
    let like = await Like.findOne({
        user: response.locals.token.uid,
        collectionRef: request.body.id
    })
        .lean().exec()
    if (like) {
        await Like.deleteOne({
            user: response.locals.token.uid,
            collectionRef: request.body.id
        })
    } else {
        await new Like({
            user: response.locals.token.uid,
            collectionRef: request.body.id
        })
            .save()
    }
    response.sendStatus(200)
    next()
}

module.exports = toggleLike
