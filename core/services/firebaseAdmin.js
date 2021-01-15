import admin from 'firebase-admin'

const accountKey = JSON.parse(process.env.NEXT_PUBLIC_ACC_KEY)
accountKey.private_key = process.env.NEXT_PUBLIC_PRIVATE

const adminConfig = {
  credential: admin.credential.cert(accountKey)
}

if (!admin.apps.length) admin.initializeApp(adminConfig)


export default admin