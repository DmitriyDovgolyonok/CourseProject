const Collection = require('../models/collectionModel')
const User = require('../models/userModel')
const Item = require('../models/itemModel')

async function deleteCollection(request, response) {
    const collection = await Collection.findById(request.body.id)
        .select('-_id items user').populate('user', '_id').lean().exec()
    const user = await User.findOne({ _id: response.locals.token.uid })
        .select('admin').lean()
    const userOwnsCollection = collection.user._id === response.locals.token.uid
    const userIsAdmin = user.admin
    if (userOwnsCollection || userIsAdmin) {
        collection.items.forEach(item => Item.findByIdAndDelete(item).exec())
        Collection.findByIdAndDelete(request.body.id).exec()
        response.sendStatus(200)
    } else {
        response.status(401).json({ message: 'errUnauthorized' })
    }
}

module.exports = deleteCollection
