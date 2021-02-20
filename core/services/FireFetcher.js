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
    return DB.collection('Users').orderBy('noPeserta').onSnapshot(action.attach, action.detach)
}


const allExams = (action) => {
    return DB.collection('Exams').orderBy('created_at').onSnapshot(action.attach, action.detach)
}

export default {
    editBiodata,
    editPhoto,
    initUserDatabase,
    getExamData,

    listen : {
        userData,
        allUsers,
        allExams
    }
}