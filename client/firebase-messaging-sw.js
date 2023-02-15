import { getMessaging, getToken } from "firebase/messaging";

const messaging = getMessaging();
getToken(messaging, { vapidKey: 'BLuxa4QvuNAaNWttvUrwubqOgZYIAy_5awImoDEOBqA_iADUglsCaFPsLsA8y5WrHvlkVHJumv1kdtn2KA_8kFg' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
});