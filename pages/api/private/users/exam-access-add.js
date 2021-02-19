import admin, { DB } from '@core/services/firebaseAdmin'

export default async (req, res) => {
    const {body: { authToken, issuedEmail, examId }} = req

    if (!authToken || !issuedEmail || !examId) {
        return res.status(400).json({ status: 'ERROR', message: 'Parameter tidak lengkap' })
    }

    //VERIVYING THE CURRENT USER
    const currentUser = await admin.auth().verifyIdToken(authToken)
    .catch(err => {
        console.log('problem with : ' + err)
        return res.status(500).json({ status: 'ERROR', message: 'Token tidak valid, coba login ulang' })
    })

    if (!currentUser.admin) return res.status(403).json({ status: 'ERROR', message: 'Anda tidak berhak memberi approval'})

    //VALIDATING THE ISSUED USER
    const issuedUser = await admin.auth().getUserByEmail(issuedEmail)
    .catch(err => {
        console.log('problem with : ' + err)
        return res.status(400).json({ status: 'ERROR', message: `Akun ${issuedEmail} tidak ditemukan`})
    })
    
    if (!issuedUser) return

    //BEGIN UPDATE PROCESS
    return await DB.collection('Users').doc(issuedUser.uid).update({
        examsAccess: admin.firestore.FieldValue.arrayUnion(examId)
    })
    .then(() => res.status(200).json({ status: 'OK', message: `Berhasil menambahkan akses ujian untuk ${issuedEmail}` }))
    .catch(err => res.status(500).json({ status: 'ERROR', message: `Gagal : ${err}` }))
}