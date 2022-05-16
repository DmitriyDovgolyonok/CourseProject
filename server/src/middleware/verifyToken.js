const firebase = require('../utils/firebase')

async function verifyToken(request, response, next) {
    try {
        if (request.headers.token) {
            const decodedToken = await firebase.auth().verifyIdToken(request.headers.token)
            response.locals.token = decodedToken
        } else {
            response.locals.token = null
        }
        next()
    } catch (error) {
        response.sendStatus(500)
    }
}

module.exports = verifyToken
