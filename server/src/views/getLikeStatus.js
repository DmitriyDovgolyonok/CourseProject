const Like = require('../models/likeModel')

async function getLikeStatus(request, response) {
    const like = await Like.findOne({ user: request.query.uid, collectionRef: request.query.id })
        .select('-_id -user -collectionRef -__v').lean()
    response.send(like != null)
}

module.exports = getLikeStatus
