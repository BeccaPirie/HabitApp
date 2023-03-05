
import admin from 'firebase-admin'
import serviceAccount from './service-account.js'
import dotenv from 'dotenv'

dotenv.config()

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

export const firebaseAdmin = {}
firebaseAdmin.sendMulticastNotification = function(payload) {
    const userNotification = {
        notification: {
            title: payload.title,
            body: payload.body
        },
        token: payload.token,
        data: payload.data || {}
    }
    // console.log(userNotification)
    return admin.messaging().sendMulticast(userNotification)
}