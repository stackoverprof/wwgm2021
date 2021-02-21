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

    //FETCH FIRST
    const currentAccess = await DB.collection('Users').doc(issuedUser.uid).get().then(doc => doc.data().examsAccess)
    .catch(err => res.status(500).json({ status: 'ERROR', message: `Gagal : ${err}` }))
    
    const currentParticipants = await DB.collection('Exams').doc(examId).get().then(doc => doc.data().participants)
    .catch(err => res.status(500).json({ status: 'ERROR', message: `Gagal : ${err}` }))

    //BEGIN UPDATE PROCESS
    await DB.collection('Users').doc(issuedUser.uid).update({
        examsAccess: currentAccess.filter(item => item !== examId)
    }).then(async () => {
        return await DB.collection('Exams').doc(examId).update({
            participants: currentParticipants.filter(item => item !== issuedUser.uid)
        })
        .then(() => res.status(200).json({ status: 'OK', message: `Berhasil menghapus akses ujian ${issuedEmail}` }))
        .catch(err => res.status(500).json({ status: 'ERROR', message: `Gagal : ${err}` }))
    })
}