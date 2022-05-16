const express = require('express')
const http = require('http')
const socket = require('socket.io')
const compression = require('compression')
//const helmet = require('helmet')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')

const blockUser = require('./src/controllers/blockUser')
const deleteCollection = require('./src/controllers/deleteCollection')
const deleteItem = require('./src/controllers/deleteItem')
const postCollection = require('./src/controllers/postCollection')
const postComment = require('./src/controllers/postComment')
const postTag = require('./src/controllers/postTag')
const signUp = require('./src/controllers/signUp')
const toggleLike = require('./src/controllers/toggleLike')
const unblockUser = require('./src/controllers/unblockUser')

const getAdminStatus = require('./src/views/getAdminStatus')
const getAllCollections = require('./src/views/getAllCollections')
const getBlockStatus = require('./src/views/getBlockStatus')
const getCategories = require('./src/views/getCategories')
const getCollection = require('./src/views/getCollection')
const getCollectionsByTag = require('./src/views/getCollectionsByTag')
const getComments = require('./src/views/getComments')
const getLikes = require('./src/views/getLikes')
const getLikeStatus = require('./src/views/getLikeStatus')
const getPopularTags = require('./src/views/getPopularTags')
const getTags = require('./src/views/getTags')
const getUser = require('./src/views/getUser')
const getUsers = require('./src/views/getUsers')
const getUsersCollections = require('./src/views/getUsersCollections')
const search = require('./src/views/search')

const adminGuard = require('./src/guards/adminGuard')
const tokenGuard = require('./src/guards/tokenGuard')
const verifyToken = require('./src/middleware/verifyToken')
const eventNewComment = require('./src/events/eventNewComment')
const eventToggleLike = require('./src/events/eventToggleLike')

const port = process.env.PORT || 3001

const app = express()

app.use(compression())
//app.use(helmet())
app.use(express.json())
app.use(verifyToken)
app.use(express.static('uploads'))
const server = http.createServer(app)
const io = socket(server)//, {
//    transports: ['websocket']
//})
app.locals.io = io

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const hex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
        const dir = path.join('uploads', 'images', hex(4))
        try {
            fs.accessSync(dir, fs.constants.F_OK)
        } catch (error) {
            fs.mkdirSync(dir, { recursive: true })
        }
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '.' + file.mimetype.split('/')[1])
    }
})

const upload = multer({ storage: storage })

io.on('connection', (socket) => {
    socket.on('collection', (collectionId) => {
        socket.join(collectionId)
    })
    socket.on('left collection', (collectionId) => {
        socket.leave(collectionId)
    })
})

app.post('/api/block-user', adminGuard, blockUser)
app.post('/api/delete-collection', tokenGuard, deleteCollection)
app.post('/api/delete-item', tokenGuard, deleteItem)
app.post('/api/post-collection', tokenGuard, upload.any('picture'), postCollection)
app.post('/api/post-comment', tokenGuard, postComment, eventNewComment)
app.post('/api/post-tag', tokenGuard, postTag)
app.post('/api/sign-up', signUp)
app.post('/api/toggle-like', tokenGuard, toggleLike, eventToggleLike)
app.post('/api/unblock-user', adminGuard, unblockUser)

app.get('/api/get-admin-status', getAdminStatus)
app.get('/api/get-all-collections', getAllCollections)
app.get('/api/get-block-status', getBlockStatus)
app.get('/api/get-categories', getCategories)
app.get('/api/get-collection', getCollection)
app.get('/api/get-collections-by-tag', getCollectionsByTag)
app.get('/api/get-comments', getComments)
app.get('/api/get-likes', getLikes)
app.get('/api/get-like-status', getLikeStatus)
app.get('/api/get-popular-tags', getPopularTags)
app.get('/api/get-tags', getTags)
app.get('/api/get-user', getUser)
app.get('/api/get-users', adminGuard, getUsers)
app.get('/api/get-users-collections', getUsersCollections)
app.get('/api/search', search)

app.use(express.static(path.join(__dirname, 'dist')))
app.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

server.listen(port)
console.log('Server up on port ' + port)