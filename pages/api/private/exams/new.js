import admin, { DB } from '@core/services/firebaseAdmin'
import { v4 as uuid } from 'uuid'

export default async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({status: 'ERROR', message: `Bad Request: No request body`})
    }
    
    const Req = req.body

    //VERIVYING THE CURRENT USER
    const currentUser = await admin.auth().verifyIdToken(Req.authToken)
        .catch(() => {
            return res.status(500).json({ status: 'ERROR', message: 'token tidak valid, coba login ulang' })
    })

    if (!currentUser.admin) {
        return res.status(403).json({ status: 'ERROR', message: 'anda tidak berhak membuat ujian'})
    }

    //REQUEST BODY STRUCTURE VALIDATION
    const examId = `${Req.cluster.toUpperCase()}-${Req.subtest.toUpperCase()}-${uuid().split('-')[0]}`
    let _dataInvalid = false

    const validate = (data, type) => {
        if (typeof data !== type || typeof data === 'undefined') {
            _dataInvalid = true
        }
        return data
    }
        
    const ExamFormat = {
        examId: examId,
        title: validate(Req.title, 'string'),
        cluster: validate(Req.cluster.toUpperCase(), 'string'),
        subtest: validate(Req.subtest.toUpperCase(), 'string'),
        status: validate(Req.status, 'string'),
        availability: {
            start: validate(Req.availability.start, 'string'),
            end: validate(Req.availability.end, 'string')
        },
        predecessor: '',
        successor: '',
        participants: [],
        security: [
            {
                editor: currentUser.uid,
                timestamp: admin.firestore.Timestamp.now()
            }
        ],
        created_at : admin.firestore.Timestamp.now()
    }

    if (_dataInvalid) {
        return res.status(400).json({status: 'ERROR', message: `Bad Request: Invalid Parametes`})
    }
    //END OF VALIDATION PROCESS
    
    const questionFiller = () => {
        let questionList = []

        for (let i = 0; i < 20; i++) {
            questionList.push({
                id: i+1,
                body: '',
                options: [
                    {
                        body: '',
                        option: 'A'
                    },
                    {
                        body: '',
                        option: 'B'
                    },
                    {
                        body: '',
                        option: 'C'
                    },
                    {
                        body: '',
                        option: 'D'
                    },
                    {
                        body: '',
                        option: 'E'
                    }
                ]
            })
        }

        return questionList
    }

    const answerFiller = () => {
        let answerList = []

        for (let i = 0; i < 20; i++) {
            answerList.push({
                id: i+1,
                body: '',
                explanation: '',
                level: ''
            })
        }

        return answerList
    }

    //FIRESTORE DB INSERTION  
    return DB.collection("Exams").doc(examId).set(ExamFormat).then(async () => {
        let completelyStored = true
 
        DB.collection("Exams").doc(examId)
            .collection('Content').doc('Questions')
            .set({
                list: questionFiller()
            })
            .catch(() => completelyStored = false)

        DB.collection("Exams").doc(examId)
            .collection('Content').doc('Answers')
            .set({
                list: answerFiller()
            })
            .catch(() => completelyStored = false)

        console.log(`New Exam created : ${examId}. Is completely : ${completelyStored}`)

        if (completelyStored) res.status(200).json({status: 'OK', message: `KODE TES ${examId}`})
        else res.status(500).json({status: 'ERROR', message: `Not completely stored, try again`})
    })
    .catch(err => res.status(500).json({status: 'ERROR', message: `Firebase related err : ${err}`}))
}