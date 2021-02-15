import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { v4 as uuid } from 'uuid'
import OutsideClickHandler from 'react-outside-click-handler'

import { STORAGE, DB } from '@core/services/firebase'
import { useLayout } from '@core/contexts/LayoutContext'
import { useAuth } from '@core/contexts/AuthContext'
import InitialAva from '@components/atomic/InitialAva'

// [TODO] : Show my initial name?
// [TODO] : initial as url parameter (? ...) &initial=true

const UploadPopUp = ({handleClose}) => {
    const [preview, setPreview] = useState({blob: '', name: ''})
    const { user, userData, setErrorAuth, refreshUserData } = useAuth()
    const { setDimm } = useLayout()

    const fileInput = useRef({current: {file: [{name: ''}]}})

    const validateImage = (file) => {
        const validType = ['image/gif', 'image/jpeg', 'image/png']
        const validSize = 5 * 1024 * 1024

        return file && validType.includes(file.type) && file.size < validSize
    }

    const generateFileName = (prevName) => {
        const user = userData.email.split('@').shift()
        const unique = uuid().split('-').shift()
        const ext = prevName.split('.').pop()

        return `${user}-${unique}.${ext}`
    }

    const updateUserData = (url) => {
        DB.collection('Users').doc(user.uid).update({
            photoURL: url
        })
        .then(() => {
            refreshUserData()
            handleClose()
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const image = fileInput.current.files[0]

        if (!validateImage(image)) {
            //seterror invalid type
            console.log('Gambar invalid. Tipe gif/jpeg/png max 5mb')
            return
        }

        const filename = generateFileName(image.name)
        const storageRef = STORAGE.ref('/Users/profile-pictures').child(filename)
        await storageRef.put(image)
            .catch(err => console.log(err))
        await storageRef.getDownloadURL()
            .then(url => updateUserData(url))
            .catch(err => console.log(err))
        
        console.log(filename)
    }

    const handleChange = (e) => {
        const image = e.target.files[0]
        const reader = new FileReader()
        
        reader.readAsDataURL(image)

        reader.onload = (res) => {
            setPreview({blob: res.target.result, name: image.name})
        }

    }

    useEffect(() => {
        setDimm(true)
        return () => {
            setDimm(false)
            setErrorAuth('')
        }
    }, [])

    return (
        <div css={style} className="fixed fullscreen flex-cs">
            <OutsideClickHandler onOutsideClick={handleClose} display="flex">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -10}} 
                    animate={{ opacity: 1, scale: 1, y: 0 , transition: { duration: 0.25, delay: 0.1}}} 
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 }}} 
                    className="pop-up full-w flex-cc col"
                >
                    <InitialAva size={96} src={preview.blob ? preview.blob : userData.photoURL} className="preview"/>
                    <form className="flex-cc col" onSubmit={handleSubmit}>
                        <div className="file-drop-area">
                            <span className="fake-btn">{preview.name ? 'Change File' : 'Choose File'}</span>
                            <span className="file-msg">{preview.name ? preview.name : 'or drag and drop files here'}</span>
                            <input type="file" ref={fileInput} onChange={handleChange} name="avatar" id="avatar" className="file-input"/>
                        </div>
                        <button type="submit">Upload</button>
                    </form>
                </motion.div>
            </OutsideClickHandler>
        </div>
    )
}

const style = css`
    padding-top: 100px;
    z-index: 99;
    pointer-events: none;
    
    > div {
        pointer-events: all;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90%;
        max-width: 600px;
        min-width: 320px;

        /* @media (min-width: 720px) {
        } */
    }
    
    .pop-up{
        background: #fff;
        padding: 54px 0;
        width: 100%;
        border-radius: 12px;
    }

    img.preview{
        border: 1px solid #0003;
    }

    .file-drop-area {
        margin: 24px 0;
        position: relative;
        display: flex;
        align-items: center;
        width: 450px;
        max-width: 100%;
        padding: 25px;
        border: 1px dashed #0005;
        border-radius: 3px;
        transition: 0.2s;
        background-color: #0001;

        &:focus {
            background-color: #0002;
        }
    }

    .fake-btn {
        font-family: Poppins;
        flex-shrink: 0;
        background-color: #fff5;
        border: 1px solid #0003;
        border-radius: 3px;
        padding: 8px 15px;
        margin-right: 10px;
        font-size: 12px;
        text-transform: uppercase;
    }

    .file-msg {
        font-family: Poppins;
        font-size: small;
        font-weight: 300;
        line-height: 1.4;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .file-input {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        cursor: pointer;
        opacity: 0;

        &:focus {
            outline: none;
        }
    }

`

export default UploadPopUp