import app from './server.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

async function main() {
    dotenv.config()
    const port = 5000 || 8000

    try {
        await mongoose.connect(process.env.DATABASE_URI,
            { useNewUrlParser: true, useUnifiedTopology: true});
        app.listen(port, ()=> {
                console.log(`listening on port: ${port}`)
            })
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

main().catch(console.error)