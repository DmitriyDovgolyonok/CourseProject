const Comment = require('../models/commentModel')

async function getComments(request, response) {
    const comments = await Comment.find({ collectionRef: request.query.id })
        .select('-_id -collectionRef -__v').populate('user', 'name _id').lean().exec()
    response.json(comments)
}

module.exports = getComments
