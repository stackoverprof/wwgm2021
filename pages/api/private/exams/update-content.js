import admin, { DB } from '@core/services/firebaseAdmin'

export default async (req, res) => {
    const {body: { authToken, examId, index, data }, body} = req

    console.log(body)
    
    if (!authToken || !examId || (!index && index !== 0) || !data) {
        return res.status(400).json({ status: 'ERROR', message: 'Parameter tidak lengkap' })
    }

    //VERIVYING THE CURRENT USER
    const currentUser = await admin.auth().verifyIdToken(authToken)
    .catch(err => {
        console.log('problem with : ' + err)
        return res.status(500).json({ status: 'ERROR', message: 'Token tidak valid, coba login ulang' })
    })

    if (!currentUser.admin) return res.status(403).json({ status: 'ERROR', message: 'Anda tidak berhak merubah data'})

    //CHECKING EXAM AVAILABILITY
    const allExamsRef = await DB.collection('Exams').listDocuments()
    if (!allExamsRef) return res.status(500).json({ status: 'ERROR', message: 'Gagal. Firebase error' })
    
    const allExams = allExamsRef.map(item => item.id)
    if (!allExams.includes(examId)) return res.status(500).json({ status: 'ERROR', message: 'Ujian terkait tidak ditemukan' })

    //RETRIEVE FILLER
    let qfiller = await DB.collection('Exams').doc(examId).collection('Content').doc('Questions').get().then(doc => doc.data().list)
    let afiller = await DB.collection('Exams').doc(examId).collection('Content').doc('Answers').get().then(doc => doc.data().list)
    
    qfiller[index] = {
        ...qfiller[index],
        imageURL: data.imageURL,
        body: data.question,
        options: [
            {
                body: data.optionA,
                option: 'A'
            },
            {
                body: data.optionB,
                option: 'B'
            },
            {
                body: data.optionC,
                option: 'C'
            },
            {
                body: data.optionD,
                option: 'D'
            },
            {
                body: data.optionE,
                option: 'E'
            }
        ]
    }

    afiller[index] = {
        ...afiller[index],
        body: data.key,
        explanation: data.explanation,
        level: parseInt(data.level),
        imageURL: data.imageURL2
    }

    //BEGIN INSERTION PROCESS
    await DB.collection('Exams').doc(examId).collection('Content').doc('Questions').update({
        list: qfiller
    }).then(async () => {
        return await DB.collection('Exams').doc(examId).collection('Content').doc('Answers').update({
            list: afiller
        })
        .then(() => res.status(200).json({ status: 'OK', message: 'Berhasil mengubah detail ujian' }))
        .catch(err => res.status(500).json({ status: 'ERROR', message: `Gagal : ${err}` }))
    })
}