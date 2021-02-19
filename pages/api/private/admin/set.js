import admin, { DB } from '@core/services/firebaseAdmin'

export default async (req, res) => {
  const { authToken, email } = req.body
  
  //CHECKING THE DATA NEEDED
  if (!email || !authToken) {
    return res.status(400).json({ status: 'ERROR', message: 'data tidak lengkap' })
  }

  //VERIVYING THE CURRENT USER
  const currentUser = await admin.auth().verifyIdToken(authToken)
    .catch(err => {
      console.log('problem with : ' + err)
      return res.status(500).json({ status: 'ERROR', message: 'token tidak valid, coba login ulang' })
    })

  if (!currentUser.admin) {
    return res.status(403).json({ status: 'ERROR', message: 'anda tidak berhak menambah admin'})
  }

  //VALIDATING THE ISSUED USER
  const issuedUser = await admin.auth().getUserByEmail(email)
    .catch(err => {
      console.log('problem with : ' + err)
      return res.status(400).json({ status: 'ERROR', message: `akun ${email} tidak ditemukan`})
    })
    
  if (!issuedUser) return
  else if (issuedUser.uid === currentUser.uid) {
    return res.status(400).json({ status: 'ERROR', message: `tidak bisa menambahkan diri sendiri` })
  }
  else if (issuedUser.hasOwnProperty('customClaims') && issuedUser.customClaims['admin']) {
    return res.status(400).json({ status: 'ERROR', message: `${email} sudah menjadi admin` })
  }

  //CLAIMING ADMIN STATUS
  return admin.auth().setCustomUserClaims(issuedUser.uid, { admin: true })
    .then(async () => {
      console.log(`new admin set : ${email}`)

      await DB.collection("Private").doc("Data").update({
          listAdmin: admin.firestore.FieldValue.arrayUnion(issuedUser.uid)
        })
      await DB.collection("Private").doc("Data").collection("AdminSecurityRecords").doc(issuedUser.uid).set({
          issued: issuedUser.uid,
          promotor: currentUser.uid,
          timestamp: admin.firestore.Timestamp.now()
        })
      
      return res.status(200).json({
        status: 'OK',
        message: `Berhasil menambahkan ${email} sebagai admin, silahkan login ulang untuk akun terkait`
      })
    })
    .catch(err => {
      console.log('problem with : ' + err)
      return res.status(500).json({ status: 'ERROR', message: 'server gagal menambahkan admin' })
    })
}