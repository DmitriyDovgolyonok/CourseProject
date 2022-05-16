const User = require('../models/userModel')

async function getUsers(request, response) {
    const users = await User.find()
        .select('-collections -__v').lean().exec()
    response.json(users)
}

module.exports = getUsers
