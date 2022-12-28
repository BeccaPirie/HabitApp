import express from 'express'

const router = express.Router()

router.get('/', async(req, res) => {res.send("auth route")})

// register
router.post('/signup', async(req, res) => {

})

// login
router.post('/login', async(req, res) => {

})

export default router