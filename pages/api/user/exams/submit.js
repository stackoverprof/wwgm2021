//check-access//koreksi//insert nilai, provinsi dan berbagai data terkait filtering ranking ke Result di Exam//called setiap sesi berakhir//param : array asnwer (per sesi)//param : kode sesi//availibity time range true//dari kode sesi, get array kunci (utk sesi tsb)//cocokin//store ke sub coll Result di Exams//return _safelyStored
import admin, { DB } from '@core/services/firebaseAdmin'

export default async (req, res) => {
    const { body: { authToken, examId, answers: userAnswers } } = req

    if (!authToken || !examId || !userAnswers) {
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
    
    if (!userData.approved) return res.status(403).json({ status: 'ERROR', message: `Forbidden! No Peserta Anda blm di approve` })
    else if (!userData.examsAccess.includes(examId)) return res.status(403).json({ status: 'ERROR', message: `Forbidden! Anda bukan participant dari ${examId}` })

    // [TODO] : CHECK IF ALREADY EXIST DONT UPDATE

    console.log(userAnswers)

    //CORRECTION ALGORTIHM

    res.status(200).json({ status: 'OK', body: 'questions', message: 'Aman' })
}