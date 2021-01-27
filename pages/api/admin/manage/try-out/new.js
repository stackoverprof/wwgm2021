import admin, { DB } from '../../../../../core/services/firebaseAdmin'
import { v4 as uuid } from 'uuid'

const Data = {
    userToken: '4q84LlmAukYfb7iOsAlJvqbzTYm2',
    title: 'Try Out Soshum 1',
    cluster: 'soshum',
    availability: {
        status: 'limited',
        start: 'January 28, 2021 at 10:00:00 AM UTC+7',
        end: 'January 28, 2021 at 3:00:00 PM UTC+7'
    },
    durations: {
        TPS1: 15,
        TPS2: 15,
        TPS3: 15,
        TPS4: 15,
        TPA1: 20,
        TPA2: 20,
        TPA3: 20,
        TPA4: 20,
    }
}

export default async (req, res) => {
    const examId = `${Data.cluster}-${uuid()}`

    const ExamData = {
        examId: examId,
        title: Data.title,
        cluster: Data.cluster,
        availability: {
            status: Data.availability.status,
            start: Data.availability.start,
            end: Data.availability.end
        },
        durations: {
            TPS1: Data.durations.TPS1,
            TPS2: Data.durations.TPS2,
            TPS3: Data.durations.TPS3,
            TPS4: Data.durations.TPS4,
            TPA1: Data.durations.TPA1,
            TPA2: Data.durations.TPA2,
            TPA3: Data.durations.TPA3,
            TPA4: Data.durations.TPA4
        },
        participans: [],
        security: [
            {
                editor: Data.userToken,
                timestamp: admin.firestore.Timestamp.now()
            }
        ]
    }

    await DB.collection("Exams").doc(examId).set(ExamData)

    const countSession = (i) => {
        const counter = Math.floor(((i-1)/15)+1)
        return i > 60 ? 'TPA' + (counter - 4) : 'TPS' + counter
    }
    
    for (let i = 1; i <= 120; i++) {
        await DB.collection("Exams").doc(examId).collection('Questions').doc(`${('00' + i).slice(-3)}`).set({
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
        })
    }    


    res.status(200).json({status: 'OK', message: `KODE TES ${examId}`})
}