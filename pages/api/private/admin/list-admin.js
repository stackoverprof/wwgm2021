import admin, { DB } from '@core/services/firebaseAdmin'

export default async (req, res) => {
    const { authToken } = req.body
    
    //CHECKING THE DATA NEEDED
    if (!authToken) {
        return res.status(400).json({ status: 'ERROR', message: 'data tidak lengkap' })
    }

    //VERIVYING THE CURRENT USER
    const currentUser = await admin.auth().verifyIdToken(authToken)
        .catch(err => {
            console.log('problem with : ' + err)
            return res.status(500).json({ status: 'ERROR', message: 'token tidak valid, coba login ulang' })
    })

    if (!currentUser.admin) {
        return res.status(403).json({ status: 'ERROR', message: 'anda tidak mengakses data'})
    }
  
    //BEGIN RETRIEVE PROCESS
    return await DB.collection('Private').doc('Data').get()
    .then(doc => doc.data().listAdmin)
    .then(listAdmin => res.status(200).json({ status: 'OK', body: listAdmin, message: 'Berhasil mengambil list all admin' }))
    .catch(err => res.status(500).json({ status: 'ERROR', message: `Gagal : ${err}` }))
}