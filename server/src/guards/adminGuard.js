const User = require('../models/userModel')

async function adminGuard(request, response, next) {
    if (response.locals.token) {
        const user = await User.findOne({ _id: response.locals.token.uid })
            .select('admin').lean()
        if (user.admin) {
            next()
            return
        }
    }
    response.status(401).json({ message: 'errUnauthorized' })
}

module.exports = adminGuard