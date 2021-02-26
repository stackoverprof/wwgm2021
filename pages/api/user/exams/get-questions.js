import admin, { DB } from '@core/services/firebaseAdmin'
import { checkCompletion } from '@core/utils/validator'

export default async (req, res) => {
    const { body: { authToken, examId } } = req

    if (!authToken || !examId) {
        return res.status(400).json({ status: 'ERROR', message: 'Data tidak lengkap' })
    }
    
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
    
    if (!checkCompletion(userData)) return res.status(403).json({ status: 'ERROR', message: `Forbidden! Biodata Anda belum dilengkapi (di dashboard)` })
    else if (!userData.approved) return res.status(403).json({ status: 'ERROR', message: `Forbidden! No Peserta Anda blm di approve` })
    else if (!userData.examsAccess.includes(examId)) return res.status(403).json({ status: 'ERROR', message: `Forbidden! Anda bukan participant dari ${examId}` })
    else if (examData.predecessor && !userData.examsHistory.includes(examData.predecessor)) return res.status(403).json({ status: 'ERROR', message: `Forbidden! Ambil sesi sebelumnya dahulu : ${examData.predecessor}` })

    const currentTime = (new Date()).getTime()
    const start = (new Date(examData.availability.start)).getTime()
    const end = (new Date(examData.availability.end)).getTime()

    if (examData.status === 'closed')  return res.status(403).json({ status: 'ERROR', message: 'Forbidden! Try Out Ditutup' })
    else if (examData.status === 'limited' && (currentTime < start || currentTime > end))  return res.status(403).json({ status: 'ERROR', message: 'Forbidden! Tidak pada waktunya' })

    const questions = await DB.collection('Exams').doc(examId).collection('Content').doc('Questions').get().then(doc => doc.data().list)
        .catch(err => {
            return res.status(500).json({ status: 'ERROR', message: `Firebase related error : ${err}` })
        })

    return res.status(200).json({ status: 'OK', body: questions, message: 'Aman' })
}