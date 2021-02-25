import admin, { DB } from '@core/services/firebaseAdmin'

export default async (req, res) => {
    const {body: { authToken, issuedEmail, code }} = req

    console.log('trig')

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
    const packageExam = await DB.collection('Private').doc('Data').get().then(doc => doc.data().package)
    
    let listExamId

    if (code === 'CP') listExamId = (packageExam['CP'].concat(packageExam['ST'])).concat(packageExam['SH'])
    else if (code === 'ST') listExamId = packageExam['CP'].concat(packageExam['ST'])
    else if (code === 'SH') listExamId = packageExam['CP'].concat(packageExam['SH'])

    console.log(listExamId)

    //BEGIN UPDATE PROCESS
    await DB.collection('Users').doc(issuedUser.uid).update({
        examsAccess: listExamId
    }).then(async () => {
        let safe = true
        for (const examId of listExamId) {
            await DB.collection('Exams').doc(examId).update({
                participants: admin.firestore.FieldValue.arrayUnion(issuedUser.uid)
            })
            .catch(() => safe = false)
        }
        if (safe) res.status(200).json({ status: 'OK', message: `Berhasil menambahkan akses ujian untuk ${issuedEmail}` })
        else res.status(500).json({ status: 'ERROR', message: 'Kegagalan server, hubungi erbin' })
    })
}