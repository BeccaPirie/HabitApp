import dotenv from 'dotenv'
dotenv.config()

const serviceAccount = {
  "type": "service_account",
  "project_id": "habit-app-8c594",
  "private_key_id": "2c85fb8fd859f11449c9e144b130e2040bb015fe",
  "private_key": process.env.PRIVATE_KEY,
  "client_email": "firebase-adminsdk-onr3d@habit-app-8c594.iam.gserviceaccount.com",
  "client_id": "109711243227796054665",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-onr3d%40habit-app-8c594.iam.gserviceaccount.com"
}

export default serviceAccount