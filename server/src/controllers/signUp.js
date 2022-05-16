const User = require('../models/userModel')
const firebase = require('../utils/firebase')

async function signUp(request, response) {
    try {
        const userRecord = await firebase.auth().createUser({
            email: request.body.email,
            emailVerified: false,
            password: request.body.password,
            displayName: request.body.name
        })
        const user = new User({
            _id: userRecord.uid,
            name: request.body.name,
            admin: false,
            blocked: false,
            email: request.body.email
        })
        await user.save()
        response.sendStatus(200)
    } catch (error) { response.status(400).send('errUserAlreadyExists') }
}

module.exports = signUp
