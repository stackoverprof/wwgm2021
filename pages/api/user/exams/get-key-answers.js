import admin, { DB } from '@core/services/firebaseAdmin'

// [TODO] : Check lagi semua level kesulitan udh diisi apa blm, ada yg NaN apa nggak

export default async (req, res) => {
    const { body: { authToken, examId } } = req

    if (!authToken || !examId) return res.status(400).json({ status: 'ERROR', message: 'Data tidak lengkap' })
    
    //VERIVYING _AUTHENTICATED
    const currentUser = await admin.auth().verifyIdToken(authToken)
    .catch(() => {
        return res.status(403).json({ status: 'ERROR', message: 'Not a user. forbidden api access' })
    })
    
    //CHECK EXAM AVAILABILITY
    const examData = await DB.collection('Exams').doc(examId).get().then(doc => doc.data())
    if (!examData) return res.status(400).json({ status: 'ERROR', message: 'Ujian tidak ditemukan' })
    
    //CHECK EXAM ACCESS
    const userData = await DB.collection('Users').doc(currentUser.uid).get().then(doc => doc.data())
    
    if (!userData.examsHistory.includes(examId)) return res.status(403).json({ status: 'ERROR', message: 'Forbidden, kerjakan ujian terlebih dahulu' })

    //CHECK EXAM AVAILABILITY
    const keyAnswers = await DB.collection('Exams').doc(examId).collection('Content').doc('Answers').get().then(doc => doc.data().list)
    if (!keyAnswers) return res.status(400).json({ status: 'ERROR', message: 'Hasil ujian tidak ditemukan' })

    return res.status(200).json({ status: 'OK', body: keyAnswers, message: 'Aman' })
}