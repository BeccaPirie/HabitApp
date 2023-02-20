import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

// generate token
export const generateToken = async(id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

// generate refresh token
export const generateRefreshToken = async(id) => {
    return jwt.sign({id}, process.env.JWT_REFRESH_SECRET)
}