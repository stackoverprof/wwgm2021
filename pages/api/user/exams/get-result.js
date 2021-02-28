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
    const readableEnd = ((new Date(end)).toString()).split(':')[0] + ':' + ((new Date(end)).toString()).split(':')[1]

    if (examData.status === 'closed') return res.status(403).json({ status: 'ERROR', message: 'Forbidden! Try Out Ditutup' })
    else if (examData.status === 'limited' && currentTime <= end)  return res.status(403).json({ status: 'ERROR', message: `Hasil bisa dilihat setelah ${readableEnd}` })

    //CHECK EXAM ACCESS
    const userData = await DB.collection('Users').doc(currentUser.uid).get().then(doc => doc.data())
    
    //CHECK EXAM AVAILABILITY
    const result = await DB.collection('Exams').doc(examId).collection('Results').doc(userData.uid).get().then(doc => doc.data())
    if (!result) return res.status(400).json({ status: 'ERROR', message: 'Hasil ujian tidak ditemukan' })

    return res.status(200).json({ status: 'OK', body: result, message: 'Aman' })
}