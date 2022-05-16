const User = require('../models/userModel')

async function getBlockStatus(request, response) {
    const user = await User.findOne({ _id: request.query.uid }).select('blocked -_id').lean().exec()
    response.send(user?.admin ?? false)
}

module.exports = getBlockStatus
