const mongoose = require('mongoose')
const mongodbUri = require('../private/mongodbUri')

mongoose.connect(mongodbUri, {
    serverSelectionTimeoutMS: 5000
}).catch(error => console.log(error.reason))

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

mongoose.connection.once('open', () => {
    console.log('MongoDB up')
})
    .on('error', error => {
        throw new Error('Database error')
    })

module.exports = mongoose
