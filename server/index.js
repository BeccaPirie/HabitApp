import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'

async function main() {
    dotenv.config()

    const client = new mongodb.MongoClient(process.env.DATABASE_URI,
        {useNewUrlParser: true, useUnifiedTopology: true})
    const port = 5000 || 8000

    try {
        await client.connect()

        app.listen(port, ()=> {
            console.log('listening on port ' + port)
        })
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

main().catch(console.error)