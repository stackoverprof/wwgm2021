import admin from '../../core/services/firebaseAdmin'

export default async (req, res) => {
  const userToken = req.body.userToken

  const decodedToken = await admin.auth().verifyIdToken(userToken).catch(err => console.log("catch " + err))

  // console.log(decodedToken.admin)
  console.log(process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_KEY)
  console.log(process.env.NEXT_PUBLIC_SERVICE_PRIVATE_KEY)

  res.status(200).json({ body: 'token ' + decodedToken })
}
