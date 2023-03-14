import express from 'express';
import protect from '../middleware/auth.js';
import Message from '../models/Message.js';
import User from '../models/User.js';

const router = express.Router();

// get users messages
router.get('/', protect, async(req, res) => {
    try {
        const messages = await Message.find({userId: req.user._id})
        console.log(messages)
        res.status(200).json(messages)
    } catch (err) {
        res.status(500).json(err)
    }
})

// add message
router.post('/add', protect, async(req, res) => {
    try {
        // console.log(req.body)
        const message = new Message(req.body)
        console.log(message)
        const newMessage = await message.save();
        console.log("saved")
        res.status(200).json(newMessage)
    } catch (err) {
        res.status(500).json(err)
    }
})

// update message
router.put('/:id', protect, async(req, res) => {
    try{
        await Message.findByIdAndUpdate(req.params.id, {$set: req.body})
        res.status(200).json("Message updated")
    } catch(err) {
        res.status(500).json(err)
    }
})

// remove message
router.delete('/:id', protect, async(req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id)
        res.status(200).json("Message removed")
    } catch (err) {
        res.status(500).json(err)
    }
})
export default router