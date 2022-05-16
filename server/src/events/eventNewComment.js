async function eventNewComment(request, response) {
    request.app.locals.io.to(request.body.id).emit(
        'new comment', {
        user: {
            _id: response.locals.token.uid,
            name: response.locals.token.name
        },
        comment: request.body.text
    })
}

module.exports = eventNewComment
