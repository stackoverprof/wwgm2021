import admin from 'firebase-admin'


console.log(process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_KEY)
console.log(process.env.NEXT_PUBLIC_SERVICE_PRIVATE_KEY)

const accountKey = JSON.parse(process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_KEY)
accountKey.private_key = process.env.NEXT_PUBLIC_SERVICE_PRIVATE_KEY

const adminConfig = {
  credential: admin.credential.cert(accountKey)
}

if (!admin.apps.length) admin.initializeApp(adminConfig)


export default admin