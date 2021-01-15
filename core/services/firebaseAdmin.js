import admin from 'firebase-admin'

const accountKey = JSON.parse(process.env.SERVICE_ACCOUNT_KEY)
accountKey.private_key = process.env.SERVICE_PRIVATE_KEY

const adminConfig = {
  credential: admin.credential.cert(accountKey)
}

if (!admin.apps.length) admin.initializeApp(adminConfig)

export default admin