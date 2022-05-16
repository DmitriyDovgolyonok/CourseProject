async function tokenGuard(request, response, next) {
    if (response.locals.token) {
        next()
    } else {
        response.status(401).json({ message: 'errUnauthorized' })
    }
}

module.exports = tokenGuard