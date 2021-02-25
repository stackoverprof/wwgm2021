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

    //CHECK TIME
    const currentTime = (new Date()).getTime()
    const start = (new Date(examData.availability.start)).getTime()
    const end = (new Date(examData.availability.end)).getTime()

    if (examData.status === 'closed')  return res.status(403).json({ status: 'ERROR', message: 'Forbidden! Try Out Ditutup' })
    else if (examData.status === 'limited' && (currentTime < start || currentTime > end))  return res.status(403).json({ status: 'ERROR', message: 'Forbidden! Sudah melebihi batas waktu pengumpulan' })

    // [TODO] : CHECK IF ALREADY EXIST DONT UPDATE
    
    const keyAnswers = await DB.collection('Exams').doc(examId).collection('Content').doc('Answers').get().then(doc => doc.data().list)
    
    let counter = 0
    let correctness = []

    for (let i = 0; i < 20; i++) {
        if (userAnswers[i] === keyAnswers[i].body) {
            correctness.push(1)
            counter++
        }
        else correctness.push(0)
    }

    const savedData = await DB.collection('Exams').doc(examId).collection('Results').doc(userData.uid).get().then(doc => doc.data())

    if (savedData) return res.status(403).json({ status: 'ERROR', message: `Forbidden! Sudah pernah mengumpulkan` })
    
    await DB.collection('Exams').doc(examId).collection('Results').doc(userData.uid).set({
        uid: userData.uid,
        noPeserta: userData.noPeserta,
        email: userData.email,
        fullName: userData.fullName,
        correctness: correctness,
        userAnswers: userAnswers,
        nonIRTResult: counter,
        timestamp: admin.firestore.Timestamp.now()
    })
    .then(() => {
        return res.status(200).json({ status: 'OK', message: 'Try Out berhasil dikumpulkan' })
    })
    .catch(err => {
        return res.status(500).json({ status: 'ERROR', message: `Firebase related error : ${err}` })
    })

}