//read, Melihat data basic sebuah exam
import { DB } from '@core/services/firebaseAdmin'

export default async (req, res) => {
    const { body: { examId }} = req

    if(!examId) return res.status(400).json({status: 'ERROR', message: `Parameter tidak lengkap`})

    const examData = await DB.collection('Exams').doc(examId).get()
        .then(res => res.data())
        
    if (!examData) return res.status(500).json({status: 'ERROR', message: `Firebase error`})

    delete examData.participants 
    delete examData.security

    res.status(200).json({status: 'OK', body: examData})
}