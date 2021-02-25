import admin, { DB } from '@core/services/firebaseAdmin'

export default async (req, res) => {
    const {body: { authToken, issuedEmail, code }} = req

    if (!authToken || !issuedEmail || !code) {
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

    //CHECKING EXAM AVAILABILITY
    const allExamsRef = await DB.collection('Exams').listDocuments()
    if (!allExamsRef) return res.status(500).json({ status: 'ERROR', message: 'Gagal. Firebase error' })
    
    const allExams = allExamsRef.map(item => item.id)
    if (!allExams.includes(examId)) return res.status(500).json({ status: 'ERROR', message: 'Ujian terkait tidak ditemukan' })

    

    //BEGIN UPDATE PROCESS
    await DB.collection('Users').doc(issuedUser.uid).update({
        examsAccess: admin.firestore.FieldValue.arrayUnion(examId)
    }).then(async () => {
        return await DB.collection('Exams').doc(examId).update({
            participants: admin.firestore.FieldValue.arrayUnion(issuedUser.uid)
        })
        .then(() => res.status(200).json({ status: 'OK', message: `Berhasil menambahkan akses ujian untuk ${issuedEmail}` }))
        .catch(err => res.status(500).json({ status: 'ERROR', message: `Gagal : ${err}` }))
    })
}