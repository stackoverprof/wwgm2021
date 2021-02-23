import admin, { DB } from '@core/services/firebaseAdmin'
import { v4 as uuid } from 'uuid'

export default async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({status: 'ERROR', message: `Bad Request: No request body`})
    }
    
    const Req = req.body

    console.log(Req.availability)

    //VERIVYING THE CURRENT USER
    const currentUser = await admin.auth().verifyIdToken(Req.authToken)
        .catch(() => {
            return res.status(500).json({ status: 'ERROR', message: 'token tidak valid, coba login ulang' })
    })

    if (!currentUser.admin) {
        return res.status(403).json({ status: 'ERROR', message: 'anda tidak berhak membuat ujian'})
    }

    //REQUEST BODY STRUCTURE VALIDATION
    const examId = `${Req.cluster.toUpperCase()}-${uuid().split('-')[0]}`
    let _dataInvalid = false

    const validate = (data, type) => {
        if (typeof data !== type || typeof data === 'undefined') {
            _dataInvalid = true
        }
        return data
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
            start: validate(Req.availability.start, 'string'),
            end: validate(Req.availability.end, 'string')
        },
        sessions: validateSession(Req.sessions),
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

    //FILLING UP INITIAL EXAMS STORING
    const countSession = (i) => {
        let count = 0
        for (const divider of divideSession) {
            if (i < divider) break
            count++
        }
        return count + 1
    }
    
    const questionFiller = () => {
        let questionList = []

        for (let i = 0; i < totalQuestions; i++) {
            questionList.push({
                id: i+1,
                body: 'Contoh soal nomor ' + (i + 1),
                imageURL: '',
                options: [
                    {
                        body: 'Opsi A ' + (i + 1),
                        option: 'A'
                    },
                    {
                        body: 'Opsi B ' + (i + 1),
                        option: 'B'
                    },
                    {
                        body: 'Opsi C ' + (i + 1),
                        option: 'C'
                    },
                    {
                        body: 'Opsi D ' + (i + 1),
                        option: 'D'
                    },
                    {
                        body: 'Opsi E ' + (i + 1),
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
                id: i+1,
                body: 'A',
                explanation: 'karena ya sementara kuncinya A buat no ' + (i + 1),
                session: countSession(i),
                level: 1
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