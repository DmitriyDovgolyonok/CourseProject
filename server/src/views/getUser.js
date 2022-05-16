const User = require('../models/userModel')

async function getUser(request, response) {
    const user = await User.findOne({ _id: request.query.uid })
        .select('-__v').lean().exec()
    response.json(user)
}

module.exports = getUser
