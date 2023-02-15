// https://firebase.google.com/docs/cloud-messaging/js/client#web-version-9_1

import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

const config = {
    apiKey: "AIzaSyD8ZhI_4MYW84mkqqBLKs7CiElZUjPTZRU",
    authDomain: "habit-app-8c594.firebaseapp.com",
    projectId: "habit-app-8c594",
    storageBucket: "habit-app-8c594.appspot.com",
    messagingSenderId: "100757282144",
    appId: "1:100757282144:web:84455f2dbac01efd0e1205",
    measurementId: "G-HSJVD7GVJQ"
}

const app = initializeApp(config);
const messaging = getMessaging(app)
getToken(messaging, {vapidKey: "BLuxa4QvuNAaNWttvUrwubqOgZYIAy_5awImoDEOBqA_iADUglsCaFPsLsA8y5WrHvlkVHJumv1kdtn2KA_8kFg"})

export const requestNotificationPermission = () =>
Notification.requestPermission().then((permission) => {
    if(permission === 'granted') {
        console.log('permission granted')
    }
})

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload)
    })
  })