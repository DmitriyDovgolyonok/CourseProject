const Like = require('../models/likeModel')

async function getLikes(request, response) {
    const likes = await Like.find({ collectionRef: request.query.id })
        .select('-_id -user -collectionRef -__v').lean().exec()
    response.json({ value: likes.length })
}

module.exports = getLikes
