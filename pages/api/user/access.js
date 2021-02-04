import admin from '@core/services/firebaseAdmin'

export default async (req, res) => {
    const { authToken } = req.body

    if (!authToken) {
        return res.status(400).json({ status: 'error', message: 'data tidak lengkap' })
    }
    
    //VERIVYING _AUTHENTICATED
    const currentUser = await admin.auth().verifyIdToken(authToken)
        .catch(() => {
            return res.status(403).json({ status: 'ERROR', message: 'not a user. forbidden api access' })
    })
    
    if (currentUser) {
        return res.status(200).json({status: 'OK', message: `Halo user ${currentUser.uid}. access granted`})
    }
}