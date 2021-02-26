import admin, { DB } from '@core/services/firebaseAdmin'

export default async (req, res) => {
    const { body: { authToken } } = req

    if (!authToken) {
        return res.status(400).json({ status: 'ERROR', message: 'Data tidak lengkap' })
    }
    
    //VERIVYING _AUTHENTICATED
    const currentUser = await admin.auth().verifyIdToken(authToken)
        .catch(() => {
            return res.status(403).json({ status: 'ERROR', message: 'Not a user. forbidden api access' })
    })
    
    const userData = await DB.collection('Users').doc(currentUser.uid).get()
    .then(doc => doc.data())

    if (userData.examsAccess || userData.email || userData.uid || userData.noPeserta || userData.approved) {
        return res.status(403).json({ status: 'ERROR', message: `Forbidden, user's fixed-data already initiated` })
    }

    await DB.collection('Users').doc(currentUser.uid).update({
        examsAccess: [],    //admin only
        examsHistory: [],    //admin only
        uid: currentUser.uid,   //permanent
        email: currentUser.email, //permanent
        noPeserta: '', //user with rules || admin 
        approved: false //admin only
    }).then(() => {
        return res.status(200).json({ status: 'OK', message: 'User Data succesfully initiated' })
    }).catch(() => {
        return res.status(500).json({ status: 'ERROR', message: 'Firebase error. Try again' })
    })
}