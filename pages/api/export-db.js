//read, Melihat data basic sebuah exam
import { DB } from '@core/services/firebaseAdmin'

export default async (req, res) => {
    const { query: { examId }} = req

    if(!examId) return res.status(400).json({status: 'ERROR', message: `Parameter tidak lengkap`})

    const results = await DB.collection('Exams').doc(examId).collection('Results').get()
        .then(docs => {
            let filler = []
            let i = 1
            docs.forEach(doc => {
                const res = doc.data()
                filler.push({
                    NO: i++,
                    NO_PESERTA: res.noPeserta,
                    NAMA: res.fullName,
                    EMAIL: res.email,
                    EXAM_ID: examId,
                    POLA_IRT: res.correctness.join(', '),
                    HISTORY_JAWABAN: res.userAnswers.join(', ')
                })
            })

            return filler
        })
        
    if (!results) return res.status(500).json({status: 'ERROR', message: `Firebase error`})


    res.status(200).json({status: 'OK', body: results})
}