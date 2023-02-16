import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const protect = async (req, res, next) => {
    let token
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token
            token = req.headers.authorization.split(' ')[1]
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // get user from token
            req.user = await User.findById(decoded.id).select('-password')
            
            next()
        } catch (error) {
            res.status(401).json(err)
        }
    }

    if(!token) {
        res.status(401).json(err)
    }
}

export default protect