const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
let User = require('../models/user.model')
const { registerValidation, loginValidation } = require('../validation')
const verify = require('../utils/verify-token')

router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const userNameExist = await User.findOne({ username: req.body.username })
    if (userNameExist) {
        return res.status(400).send('Username already taken!')
    }
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) {
        return res.status(400).send('Email already taken!')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    })
        .save()
        .then(user => res.send({ userId: user._id }))
        .catch(error => res.status(400).json({ error }))
})

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send('Email is not found!')
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
        return res.status(400).send('Invalid Password!')
    }
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
})

router.get('/getuser', verify, async (req, res) => {
    const user = await User.findOne({ _id: req.user })
    if (user) {
        return res.json({ user })
    }
    return res.status(400).send('User is not found!')
})

module.exports = router
