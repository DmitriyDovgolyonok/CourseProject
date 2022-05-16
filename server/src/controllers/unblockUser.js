const User = require('../models/userModel')

async function unblockUser(request, response) {
    User.findByIdAndUpdate(
        request.body.uid,
        { blocked: false }
    )
        .lean().exec()
    response.sendStatus(200)
}

module.exports = unblockUser
