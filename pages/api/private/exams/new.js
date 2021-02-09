import admin, { DB } from '@core/services/firebaseAdmin'
import { v4 as uuid } from 'uuid'

export default async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({status: 'ERROR', message: `Bad Request: No request body`})
    }
    
    const Req = req.body

    //VERIVYING THE CURRENT USER
    const currentUser = await admin.auth().verifyIdToken(Req.userToken)
        .catch(() => {
            return res.status(500).json({ status: 'ERROR', message: 'token tidak valid, coba login ulang' })
    })

    if (!currentUser.admin) {
        return res.status(403).json({ status: 'ERROR', message: 'anda tidak berhak membuat ujian'})
    }

    //REQUEST BODY STRUCTURE VALIDATION
    const examId = `${Req.cluster.toUpperCase()}-${uuid()}`
    let _dataInvalid = false

    const validate = (data, type) => {
        if (typeof data !== type || typeof data === 'undefined') {
            _dataInvalid = true
        }
        return data
    }

    const validateTimeStamp = (data) => {
        if (typeof data !== 'number') {
            _dataInvalid = true
            return
        }
        return admin.firestore.Timestamp.fromMillis(data)
    }

    let totalQuestions = 0
    let divideSession = []

    const validateSession = (data) => {
        if (!Array.isArray(Req.sessions)) {
            _dataInvalid = true
            return
        }

        for (const each of data) {
            validate(each.name, 'string')
            validate(each.size, 'number')
            validate(each.duration, 'number')
            totalQuestions += each.size
            divideSession.push(totalQuestions)
        }

        return data
    }
    
    const ExamFormat = {
        examId: examId,
        title: validate(Req.title, 'string'),
        cluster: validate(Req.cluster.toUpperCase(), 'string'),
        status: validate(Req.status, 'string'),
        availability: {
            start: validateTimeStamp(Req.availability.start),
            end: validateTimeStamp(Req.availability.end)
        },
        sessions: validateSession(Req.sessions),
        participans: [],
        security: [
            {
                editor: currentUser.uid,
                timestamp: admin.firestore.Timestamp.now()
            }
        ]
    }

    if (_dataInvalid) {
        return res.status(400).json({status: 'ERROR', message: `Bad Request: Invalid Parametes`})
    }
    //END OF VALIDATION PROCESS

    //FILLING UP INITIAL EXAMS STORING
    const countSession = (i) => {
        let count = 0
        for (const divider of divideSession) {
            if (i < divider) break
            count++
        }
        return count
    }
    
    const questionFiller = () => {
        let questionList = []

        for (let i = 0; i < totalQuestions; i++) {
            questionList.push({
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
                ],
                session: countSession(i)
            })
        }

        return questionList
    }

    const answerFiller = () => {
        let answerList = []

        for (let i = 0; i < totalQuestions; i++) {
            answerList.push({
                body: '',
                explanation: '',
                session: countSession(i)
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