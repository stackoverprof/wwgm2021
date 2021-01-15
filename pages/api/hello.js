import admin from '../../core/services/firebaseAdmin'

export default async (req, res) => {
  console.log(process.env.SERVICE_PRIVATE_KEY_ID)
  console.log(process.env.SERVICE_PRIVATE_KEY)
  console.log(process.env.SERVICE_CLIENT_EMAIL)
  console.log(process.env.SERVICE_CLIENT_ID)

  const userToken = req.body.userToken

  const decodedToken = await admin.auth().verifyIdToken(userToken).catch(err => console.log("catch " + err))

  console.log(decodedToken.admin)

  res.status(200).json({ body: 'token ' + decodedToken })
}
