import admin, { DB } from '../../../../../core/services/firebaseAdmin'
import { v4 as uuid } from 'uuid'

// sample of good request body
// const Req = {
//     userToken: '4q84LlmAukYfb7iOsAlJvqbzTYm2',
//     title: 'Try Out Soshum 1',
//     cluster: 'soshum',
//     availability: {
//         status: 'limited',
//         start: 1611802800000,
//         end: 1611820800000
//     },
//     durations: {
//         TPS1: 15,
//         TPS2: 15,
//         TPS3: 15,
//         TPS4: 15,
//         TPA1: 20,
//         TPA2: 20,
//         TPA3: 20,
//         TPA4: 20,
//     }
// }
//[TODO] : 
// TODO: perbedaan struktur data SAINTEK dan SOSHUM
export default async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({status: 'ERROR', message: `Bad Request: No request body`})
    }
    
    const Req = req.body

    //VERIVYING THE CURRENT USER
    const currentUser = await admin.auth().verifyIdToken(Req.userToken)
        .catch(err => {
            console.log('problem with : ' + err)
            return res.status(500).json({ status: 'error', message: 'token tidak valid, coba login ulang' })
    })

    if (!currentUser.admin) {
        return res.status(403).json({ status: 'error', message: 'anda tidak berhak membuat ujian'})
    }

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
    
    const ExamFormat = {
        examId: examId,
        title: validate(Req.title, 'string'),
        cluster: validate(Req.cluster.toUpperCase(), 'string'),
        availability: {
            status: validate(Req.availability.status, 'string'),
            start: validateTimeStamp(Req.availability.start),
            end: validateTimeStamp(Req.availability.end)
        },
        durations: {
            TPS1: validate(Req.durations.TPS1, 'number'),
            TPS2: validate(Req.durations.TPS2, 'number'),
            TPS3: validate(Req.durations.TPS3, 'number'),
            TPS4: validate(Req.durations.TPS4, 'number'),
            TPA1: validate(Req.durations.TPA1, 'number'),
            TPA2: validate(Req.durations.TPA2, 'number'),
            TPA3: validate(Req.durations.TPA3, 'number'),
            TPA4: validate(Req.durations.TPA4, 'number')
        },
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

    const countSession = (i) => {
        const counter = Math.floor(((i-1)/15)+1)
        return i > 60 ? 'TPA' + (counter - 4) : 'TPS' + counter
    }

    const QuestionsFormat = (i) => { 
        return {
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
            answer: '',
            explanation: '',
            session: countSession(i)
        }
    }

    //FIRESTORE DB INSERTION    
    return DB.collection("Exams").doc(examId).set(ExamFormat).then(async () => {
        let completelyStored = true
        for (let i = 1; i <= 120; i++) {
            await DB.collection("Exams").doc(examId)
                .collection('Questions').doc(`${('00' + i).slice(-3)}`)
                .set(QuestionsFormat(i))
                .catch(() => completelyStored = false)
        }

        console.log(`New Exam created : ${examId}`)

        if (completelyStored) res.status(200).json({status: 'OK', message: `KODE TES ${examId}`})
        else res.status(500).json({status: 'ERROR', message: `Not completely stored, try again`})
    })
    .catch(err => res.status(500).json({status: 'ERROR', message: `Firebase related err : ${err}`}))
}