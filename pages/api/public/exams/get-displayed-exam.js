import { DB } from '@core/services/firebaseAdmin'

export default async (req, res) => {
    await DB.collection('Private').doc('Data').get()
        .then(doc => res.status(200).json({status: 'OK', body: doc.data().displayedExams}))
        .catch(err => res.status(500).json({status: 'ERROR', message: `Firebase error: ${err}`}))
}