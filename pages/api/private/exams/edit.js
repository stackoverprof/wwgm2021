import admin, { DB } from '@core/services/firebaseAdmin'

export default async (req, res) => {
    const {body: { status, start, end, duration, successor, predecessor, examId, authToken }} = req
    
    if (!authToken || !examId) {
        return res.status(400).json({ status: 'ERROR', message: 'Parameter tidak lengkap' })
    } else if (!['open', 'closed', 'limited'].includes(status)) {
        return res.status(400).json({ status: 'ERROR', message: `Exam's status invalid` })
    }

    //VERIVYING THE CURRENT USER
    const currentUser = await admin.auth().verifyIdToken(authToken)
    .catch(err => {
        console.log('problem with : ' + err)
        return res.status(500).json({ status: 'ERROR', message: 'Token tidak valid, coba login ulang' })
    })

    if (!currentUser.admin) return res.status(403).json({ status: 'ERROR', message: 'Anda tidak berhak merubah data'})

    //CHECKING EXAM AVAILABILITY
    const allExamsRef = await DB.collection('Exams').listDocuments()
    if (!allExamsRef) return res.status(500).json({ status: 'ERROR', message: 'Gagal. Firebase error' })
    
    const allExams = allExamsRef.map(item => item.id)
    if (!allExams.includes(examId)) return res.status(500).json({ status: 'ERROR', message: 'Ujian terkait tidak ditemukan' })

    //BEGIN INSERTION PROCESS
    return await DB.collection('Exams').doc(examId).update({
        status: status,
        availability: {
            start: start,
            end: end
        },
        duration: duration,
        successor: successor,
        predecessor: predecessor,
        security: admin.firestore.FieldValue.arrayUnion({
            editor: currentUser.uid,
            timestamp: admin.firestore.Timestamp.now(),
            req: JSON.stringify({status, start, end, successor, predecessor, duration})
        })
    })
    .then(() => res.status(200).json({ status: 'OK', message: 'Berhasil mengubah detail ujian' }))
    .catch(err => res.status(500).json({ status: 'ERROR', message: `Gagal : ${err}` }))
}