import admin, { DB } from '@core/services/firebaseAdmin'

export default async (req, res) => {
    const {body: { authToken, issuedEmail, value }} = req

    if (!authToken || !issuedEmail || typeof value === 'undefined') {
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

    //CHECK IF NO PESERTA FILLED
    const issuedUserData = await DB.collection('Users').doc(issuedUser.uid).get().then(doc => doc.data())

    if (!issuedUserData.noPeserta) {
        return res.status(403).json({ status: 'ERROR', message: 'User belum mengisi no peserta'})
    }

    //BEGIN UPDATE PROCESS
    return await DB.collection('Users').doc(issuedUser.uid).update({
        approved: value
    })
    .then(() => res.status(200).json({ status: 'OK', message: `Berhasil ${value ? 'approve' : 'disapprove'} ${issuedEmail}` }))
    .catch(err => res.status(500).json({ status: 'ERROR', message: `Gagal : ${err}` }))
}