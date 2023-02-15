// code from https://izaanjahangir.medium.com/setting-schedule-push-notification-using-node-js-and-mongodb-95f73c00fc2e

import admin from 'firebase-admin'
import serviceAccount from './service-account.js'

const FIREBASE_DATABASE_URL = '';
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: FIREBASE_DATABASE_URL
})
const firebaseAdmin = {};
firebaseAdmin.sendMulticastNotification = function(payload) {
    const message = {
        notification: {
            title: payload.title,
            body: payload.body
        },
        tokens: payload.tokens,
        data: payload.data || {}
    };
    return admin.messaging().sendMulticast(message);
};

export default firebaseAdmin