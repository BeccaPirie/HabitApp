import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// verify jwt
const protect = async (req, res, next) => {
    let token
    console.log(req.headers.authorization)
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // get token
            token = req.headers.authorization.split(' ')[1] 
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // get user from token
            req.user = await User.findById(decoded.id).select('-password')
            console.log(req.user)
            next()
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

export default protect