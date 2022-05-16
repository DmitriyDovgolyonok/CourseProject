const User = require('../models/userModel')

async function getAdminStatus(request, response) {
    const user = await User.findOne({ _id: request.query.uid }).select('admin -_id').lean().exec()
    response.send(user?.admin ?? false)
}

module.exports = getAdminStatus
