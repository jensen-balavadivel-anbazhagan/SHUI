const { Router } = require('express');
const router = new Router();
const User = require('../models/users.js');
const Stream = require('../models/streams.js')
const verifyToken = require('../middlewares/verifytoken')

router.post('/login', async (req, res) => {
    const token = await User.authorizeUser(req.body);
    if (token) {

        res.status(200).send({
            token: token
        })
    } else {
        res.status(401).json({
            error: "Not authorized"
        })
    }
})

router.post('/register', async (req, res) => {
    const user = await User.createUser(req.body);
    if (user) {
        res.status(200).json({
            message: 'user is created',
            user: {
                username: user.userName
            }
        })
    } else {
        res.status(400).json({
            message: 'User already exists'
        })
    }

})

router.post('/addtag', verifyToken.authorize, async (req, res) => {
    if (req.user) {
        const user = await User.addtag(req.body, req.user)
        res.status(200).json({
            message: "new tag has been added!!",
            newTag: {
                tagName: user.tags
            }
        })
    } else {
        res.status(400).json({
            message: 'Unable to add the tag'
        })
    }

})
router.get('/tags', verifyToken.authorize, async (req, res) => {
    if (req.user) {
        const user = await User.getTags(req.user)
        res.status(200).json({
            message: "all tags are displayed",
            tags: user.tags
        })
    } else {
        res.status(400).json({
            message: 'Unable to add the tag'
        })
    }
})

router.delete('/tag', verifyToken.authorize, async (req, res) => {

    if (req.user) {
        const tagData = await User.removeTag(req.body, req.user)
        res.status(200).json({
            message: "tag is deleted from tag array",
            tags: tagData
        })
    } else {
        res.status(400).json({
            message: 'Unable to remove the tag'
        })
    }
})

router.delete('/tags', verifyToken.authorize, async (req, res) => {
    if (req.user) {
        const tagData = await User.removeAllTags(req.user)
        res.status(200).json({
            message: "All tags are deleted from tag array",
        })
    } else {
        res.status(400).json({
            message: 'Unable to delete the tags'
        })
    }
})

router.delete('/userDelete', verifyToken.authorize, async (req, res) => {
    if (req.user) {
        const user = await User.deleteUser(req.user)
        const streams = await Stream.removeAllStreams(req.user)
        res.status(200).json({
            message: "user is deleted"
        })
    } else {
        res.status(400).json({
            message: 'Unable to delete the tags'
        })
    }
})
module.exports = router;