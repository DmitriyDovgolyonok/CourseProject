const firebase = require('firebase-admin')
const firebaseKey = require('../private/firebaseKey')

firebase.initializeApp({
    credential: firebase.credential.cert(firebaseKey),
})

module.exports = firebase