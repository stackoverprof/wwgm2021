import admin from '../../core/services/firebaseAdmin'

export default async (req, res) => {
  const userToken = req.body.userToken

  const decodedToken = await admin.auth().verifyIdToken(userToken).catch(err => console.log("catch " + err))

  res.status(200).json({ body: 'token ' + decodedToken})
}
