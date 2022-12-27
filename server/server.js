import express from 'express'
import cors from 'cors'
import userRoute from './routes/user.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/server/user", userRoute)

app.use('*', (req, res)=>{
    res.status(404).json({error: "not found"})
})

export default app