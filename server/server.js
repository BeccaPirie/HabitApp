import express from 'express'
import cors from 'cors'
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import habitRoute from './routes/habits.js'
import notificationRoute from './routes/notifications.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/server/auth", authRoute)
app.use("/server/user", userRoute)
app.use("/server/habit", habitRoute)
app.use("/server/notification", notificationRoute)

app.use('*', (req, res)=>{
    res.status(404).json({error: "not found"})
})

export default app