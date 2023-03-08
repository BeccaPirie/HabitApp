// https://firebase.google.com/docs/cloud-messaging/js/client#web-version-9_1

// import axios from 'axios'
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

// projects configuration
const config = {
    apiKey: "AIzaSyD8ZhI_4MYW84mkqqBLKs7CiElZUjPTZRU",
    authDomain: "habit-app-8c594.firebaseapp.com",
    projectId: "habit-app-8c594",
    storageBucket: "habit-app-8c594.appspot.com",
    messagingSenderId: "100757282144",
    appId: "1:100757282144:web:84455f2dbac01efd0e1205",
    measurementId: "G-HSJVD7GVJQ"
}

// initialise firebase
const app = initializeApp(config)

// initialise FCM and get reference to service
const messaging = getMessaging(app)

export const getFirebaseToken = async(setToken) => {
  return getToken(messaging, {vapidKey: "BLuxa4QvuNAaNWttvUrwubqOgZYIAy_5awImoDEOBqA_iADUglsCaFPsLsA8y5WrHvlkVHJumv1kdtn2KA_8kFg"})
    .then((currentToken) => {
      if(currentToken) {
        setToken(currentToken);
        // call api to update user account with new token
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        // setToken(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    })
}

// configure foreground listener
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage((payload) => {
      resolve(payload)
    })
  })

// // request notification permissions and receive current
// // registration token for app instance
// export const requestNotificationPermission = () =>
// Notification.requestPermission().then((permission) => {
//     if(permission === 'granted') {
//         console.log('permission granted')
//     }
// })