import admin, { DB } from '@core/services/firebaseAdmin'

export default async (req, res) => {
    const { body: { authToken, issuedNoPeserta } } = req

    console.log('called')

    if (!authToken || !issuedNoPeserta) {
        return res.status(400).json({ status: 'ERROR', message: 'Data tidak lengkap' })
    }
    
    //VERIVYING _AUTHENTICATED
    const currentUser = await admin.auth().verifyIdToken(authToken)
        .catch(() => {
            return res.status(403).json({ status: 'ERROR', message: 'Not a user. forbidden api access' })
    })
    
    const userData = await DB.collection('Users').doc(currentUser.uid).get()
    .then(doc => doc.data())

    if (userData.approved) {
        return res.status(403).json({ status: 'ERROR', message: 'Forbidden, user has already been approved by admin' })
    }

    await DB.collection('Users').doc(currentUser.uid).update({
        noPeserta: issuedNoPeserta, //user with rules || admin
    }).then(() => {
        return res.status(200).json({ status: 'OK', message: 'No Peserta succesfully changed!' })
    }).catch(() => {
        return res.status(500).json({ status: 'ERROR', message: 'Firebase error. Try again' })
    })
}