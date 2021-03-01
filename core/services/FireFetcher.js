import { DB } from './firebase'

const editBiodata = (uid, query) => {
    return DB.collection('Users').doc(uid).update(query)
}

const editPhoto = (uid, query) => {
    return DB.collection('Users').doc(uid).update(query)
}

const initUserDatabase = (uid, query) => {
    return DB.collection('Users').doc(uid).set(query)
}

const getExamData = (examId) => {
    return DB.collection('Exams').doc(examId).get()
}

//LISTENER - Realtime
const userData = (uid, action) => {
    return DB.collection('Users').doc(uid).onSnapshot(action.attach, action.detach)
}

const allUsers = (action) => {
    return DB.collection('Users').orderBy('fullName').onSnapshot(action.attach, action.detach)
}

const allExams = (action) => {
    return DB.collection('Exams').orderBy('created_at', 'desc').onSnapshot(action.attach, action.detach)
}

const examParticipants = (examId, action) => {
    return DB.collection('Exams').doc(examId).onSnapshot(action.attach, action.detach)
}

const examQuestions = (examId, action) => {
    return DB.collection('Exams').doc(examId).collection('Content').doc('Questions').onSnapshot(action.attach, action.detach)
}
const examAnswers = (examId, action) => {
    return DB.collection('Exams').doc(examId).collection('Content').doc('Answers').onSnapshot(action.attach, action.detach)
}

export default {
    editBiodata,
    editPhoto,
    initUserDatabase,
    getExamData,

    listen : {
        userData,
        allUsers,
        allExams,
        examParticipants,
        examQuestions,
        examAnswers
    }
}