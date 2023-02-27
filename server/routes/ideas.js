import express from 'express'
import Idea from '../models/Idea.js'

const router = express.Router()

router.get('/', async(req, res) => {
    try {
        const ideas = await Idea.find({})
        res.json(ideas)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post('/add', async(req, res) => {
    const newIdea = new Idea({name: req.body.name})
    try {
        await newIdea.save()
    } catch (err) {
        res.status(500).send(err)
    }
})

export default router