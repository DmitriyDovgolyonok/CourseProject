async function eventNewComment(request, response) {
    request.app.locals.io.to(request.body.id).emit('toggle like')
}

module.exports = eventNewComment
