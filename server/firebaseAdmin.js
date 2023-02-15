// code from https://izaanjahangir.medium.com/setting-schedule-push-notification-using-node-js-and-mongodb-95f73c00fc2e

import admin from 'firebase-admin'
import serviceAccount from './service-account.js'

const FIREBASE_DATABASE_URL = '';
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: FIREBASE_DATABASE_URL
})

export const messaging = admin.messaging()