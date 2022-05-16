const Collection = require('../models/collectionModel')
const User = require('../models/userModel')
const Item = require('../models/itemModel')

async function deleteItem(request, response) {
    const item = await Item.findById(request.body.id)
        .populate('collectionRef', 'user').select('collectionRef').lean().exec()
    const user = await User.findOne({ _id: response.locals.token.uid })
        .select('admin').lean()
    const userOwnsCollection = item.collectionRef.user === response.locals.token.uid
    const userIsAdmin = user.admin
    if (userOwnsCollection || userIsAdmin) {
        Item.findByIdAndDelete(request.body.id).exec()
        response.sendStatus(200)
    } else {
        response.status(401).json({ message: 'errUnauthorized' })
    }
}

module.exports = deleteItem
