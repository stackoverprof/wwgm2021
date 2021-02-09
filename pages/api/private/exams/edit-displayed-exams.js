import admin, { DB } from '@core/services/firebaseAdmin'

export default async (req, res) => {
    const {body: { position, examId, token }} = req

    //VERIVYING THE CURRENT USER
    const currentUser = await admin.auth().verifyIdToken(token)
    .catch(err => {
        console.log('problem with : ' + err)
        return res.status(500).json({ status: 'ERROR', message: 'Token tidak valid, coba login ulang' })
    })

    if (!currentUser.admin) return res.status(403).json({ status: 'ERROR', message: 'Anda tidak berhak merubah data'})

    //CHECKING EXAM AVAILABILITY
    const allExamsRef = await admin.firestore().collection('Exams').listDocuments()
    if (!allExamsRef) return res.status(500).json({ status: 'ERROR', message: 'Gagal. Firebase error' })
    
    const allExams = allExamsRef.map(item => item.id)
    if (!allExams.includes(examId)) return res.status(500).json({ status: 'ERROR', message: 'Ujian terkait tidak ditemukan' })

    //BEGIN INSERTION PROCESS
    const privateData = await DB.collection('Private').doc('Data').get()
    if (!privateData) return res.status(500).json({ status: 'ERROR', message: 'Gagal. Firebase error' })
    
    const { displayedExams } = privateData.data()

    let updated = displayedExams
    updated[position] = examId

    return await DB.collection('Private').doc('Data').update({
        displayedExams: updated
    })
    .then(() => res.status(200).json({ status: 'OK', message: 'Berhasil mengubah data display' }))
    .catch(err => res.status(500).json({ status: 'ERROR', message: `Gagal : ${err}` }))
}