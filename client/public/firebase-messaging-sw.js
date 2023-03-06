importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

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
firebase.initializeApp(config)

// get firebase messaging
const messaging = firebase.messaging()

// configure background listener
messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload)
  
    const notificationTitle = payload.notification.title
    const notificationOptions = {
      body: payload.notification.body,
    }
  
    self.registration.showNotification(notificationTitle,
      notificationOptions)
  })