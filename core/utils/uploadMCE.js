import { STORAGE } from '@core/services/firebase'
import { v4 as uuid } from 'uuid'

const generateFileName = (prevName) => {
    const unique = uuid().split('-').shift()
    const ext = prevName.split('.').pop()

    return `${prevName}-${unique}.${ext}`
}

const validateImage = (file) => {
    const validType = ['image/jpeg', 'image/png']
    const validSize = 5 * 1024 * 1024

    return file && validType.includes(file.type) && file.size < validSize
}
 
const UploadMCE = async (image, success, failure) => {
    if (!validateImage(image)) {
        failure('File invalid, hanya png/jpg/jpeg dengan ukuran < 5mb')
        return
    }

    const filename = generateFileName(image.name)
    const storageRef = STORAGE.ref(`/ExamImages`).child(filename)
    await storageRef.put(image)
        .catch(err=>{
            failure(`${err.code}, ${err.message}`)
            return
        })

    const imageURL = await storageRef.getDownloadURL()
        .catch(err=>{
            failure(`${err.code}, ${err.message}`)
            return
        })
    
    if (imageURL) success(imageURL)
    else failure('Error occured, unknown')
}

export default UploadMCE