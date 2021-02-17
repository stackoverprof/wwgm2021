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


//LISTENER - Realtime
const userData = (uid, action) => {
    return DB.collection('Users').doc(uid).onSnapshot(action)
}

export default {
    editBiodata,
    editPhoto,
    initUserDatabase,
    listen : {
        userData
    }
}