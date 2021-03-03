import admin, { DB } from '@core/services/firebaseAdmin'

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
    
    //CHECK VALIDATE TIME
    const currentTime = (new Date()).getTime()
    const end = (new Date(examData.availability.end)).getTime() + 3 * 60 * 60 * 1000

    if (examData.status === 'closed') return res.status(403).json({ status: 'ERROR', message: 'Forbidden! Try Out Ditutup' })
    else if (examData.status === 'limited' && currentTime <= end)  return res.status(403).json({ status: 'ERROR', message: 'Hasil bisa dilihat setelah masa tryout usai' })

    //CHECK EXAM ACCESS
    const userData = await DB.collection('Users').doc(currentUser.uid).get().then(doc => doc.data())
    
    if (!userData.examsHistory.includes(examId)) return res.status(403).json({ status: 'ERROR', message: 'Forbidden, kerjakan ujian terlebih dahulu' })

    //BEGIN PREPARING DATA
    const questions = await DB.collection('Exams').doc(examId).collection('Content').doc('Questions').get().then(doc => doc.data().list)
    if (!questions) return res.status(400).json({ status: 'ERROR', message: 'Gagal mengambil daftar pertanyaan' })

    const keyAnswers = await DB.collection('Exams').doc(examId).collection('Content').doc('Answers').get().then(doc => doc.data().list)
    if (!keyAnswers) return res.status(400).json({ status: 'ERROR', message: 'Hasil ujian tidak ditemukan' })

    let filler = []

    keyAnswers.forEach((item, i) => {
        filler.push({
            ...item,
            questionInfo: questions[i]
        })
    })

    return res.status(200).json({ status: 'OK', body: filler, message: 'Aman' })
}