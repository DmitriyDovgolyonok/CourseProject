const User = require('../models/userModel')

async function blockUser(request, response) {
    User.findByIdAndUpdate(request.body.uid, {blocked: true})
        .lean().exec()
    response.sendStatus(200)
}

module.exports = blockUser
