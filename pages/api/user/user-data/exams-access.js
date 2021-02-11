import admin, { DB } from '@core/services/firebaseAdmin'

export default async (req, res) => {
    const { authToken } = req.body

    if (!authToken) {
        return res.status(400).json({ status: 'error', message: 'data tidak lengkap' })
    }
    
    //VERIVYING _AUTHENTICATED
    const currentUser = await admin.auth().verifyIdToken(authToken)
        .catch(() => {
            return res.status(403).json({ status: 'ERROR', message: 'Not a user. forbidden api access' })
    })
    
    const userData = await DB.collection('Users').doc(currentUser.uid).get()
    .then(doc => doc.data())

    console.log(userData)

    if (userData.examsAccess) {
        return res.status(403).json({ status: 'ERROR', message: 'Exams access already initiated. forbidden api access' })
    }

    await DB.collection('Users').doc(currentUser.uid).update({
        examsAccess: []
    }).then(() => {
        return res.status(200).json({ status: 'OK', message: 'User Data succesfully initiated' })
    })
}