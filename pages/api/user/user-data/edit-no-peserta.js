import admin, { DB } from '@core/services/firebaseAdmin'
import { validateFormatNoPeserta } from '@core/utils/validator'

export default async (req, res) => {
    const { body: { authToken, issuedNoPeserta } } = req

    
    if (!authToken || !issuedNoPeserta || typeof issuedNoPeserta !== 'string') {
        return res.status(400).json({ status: 'ERROR', message: 'Bad Request, data invalid' })
    }
    
    
    if (!validateFormatNoPeserta(issuedNoPeserta)) {
        return res.status(400).json({ status: 'ERROR', message: 'Bad Request, data invalid' })
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
        noPeserta: issuedNoPeserta //user with rules || admin
    }).then(() => {
        return res.status(200).json({ status: 'OK', message: 'No Peserta succesfully changed!' })
    }).catch(() => {
        return res.status(500).json({ status: 'ERROR', message: 'Firebase error. Try again' })
    })
}