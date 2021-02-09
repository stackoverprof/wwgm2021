import admin, { DB } from '@core/services/firebaseAdmin'

export default async (req, res) => {
    const {body: { position, examId, token }} = req

    //VERIVYING THE CURRENT USER
    const currentUser = await admin.auth().verifyIdToken(token)
    .catch(err => {
        console.log('problem with : ' + err)
        return res.status(500).json({ status: 'ERROR', message: 'token tidak valid, coba login ulang' })
    })

    if (!currentUser.admin) {
        return res.status(403).json({ status: 'ERROR', message: 'anda tidak berhak menambah admin'})
    }

    const doc = await DB.collection('Private').doc('Data').get()

    if (!doc) return res.status(500).json({ status: 'ERROR', message: 'Gagal. Firebase error' })
    
    const { displayedExams } = doc.data()

    let updated = displayedExams
    updated[position] = examId

    return await DB.collection('Private').doc('Data').update({
        displayedExams: updated
    })
    .then(() => res.status(200).json({ status: 'OK', message: 'Berhasil mengubah data display' }))
    .catch(err => res.status(500).json({ status: 'error', message: `Gagal : ${err}` }))
}