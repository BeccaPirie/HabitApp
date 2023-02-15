import admin from 'firebase-admin'
import serviceAccount from './service-account.js'

const FIREBASE_DATABASE_URL = '';
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: FIREBASE_DATABASE_URL
})

export const messaging = admin.messaging()