import express from 'express'
import bcrypt from 'bcrypt'

const router = express.Router()

router.get('/', async(req, res) => {res.send("auth route")})

// register
router.post('/signup', async(req, res) => {
    try {
        // create password
        const bcryptPass = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, bcryptPass)

        // create user
        const createUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: password
        })

        // save user
        const user = await createUser.save()
        res.json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

// login
router.post('/login', async(req, res) => {
    try {
        // find user
        const loginUser = await User.findOne({username: req.body.username})
        if(!loginUser) res.status(404).json("User not found")

        // check password
        const loginPassword = await bcrypt.compare(loginUser.password, req.body.password)
        if(!loginPassword) res.status(400).json("Incorrect password")
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router