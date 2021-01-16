import admin, { DB } from '../../core/services/firebaseAdmin'

export default async (req, res) => {
  const { userToken, email } = req.body

  if (!email && !userToken) {
    return res.status(400).json({ status: "error", message: "bad request, incomplete parameters" })
  }

  const currentUser = await admin.auth().verifyIdToken(userToken)
    .catch(err => {
      console.log("decoding error : " + err)
      return res.status(500).json({ status: "error", message: err.message })
    })

  if (!currentUser.admin) {
    return res.status(403).json({ status: "error", message: "anda tidak berhak menambah admin"})
  }

  const issuedUser = await admin.auth().getUserByEmail(email)

  if (typeof issuedUser === 'undefined') return res.status(400).json({ status: "error", message: email + " is not a user" })
  else if (issuedUser.hasOwnProperty('customClaims') && issuedUser.customClaims.admin) {
    return res.status(400).json({ message: email + " is already an admin" })
  }

  return admin.auth().setCustomUserClaims(issuedUser.uid, { admin: true })
    .then(() => {
      DB.collection("Private").doc("Data").update({
          ListAdmin: admin.firestore.FieldValue.arrayUnion(issuedUser.uid)
      }).catch(err => console.log("db " + err))
      DB.collection("Private").doc("Data").collection("AdminSecurityRecord").doc(issuedUser.uid).set({
        issued: issuedUser.uid,
        promotor: currentUser.uid,
        timestamp: admin.firestore.Timestamp.now()
      }).catch(err => console.log("db " + err))

      console.log(`new admin set : ${email}`)
      
      res.status(200).json({
        status: "success",
        message: `Berhasil menambahkan ${email} sebagai admin, silahkan login ulang untuk akun terkait`
      })
    })
    .catch((err) => {
      console.log('customUserClaims failed ' + err)
      res.status(500).json({ status: "error", message: err.message })
    })
}
