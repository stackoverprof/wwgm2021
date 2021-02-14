import React, { useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { v4 as uuid } from 'uuid'
import OutsideClickHandler from 'react-outside-click-handler'

import { STORAGE, DB } from '@core/services/firebase'
import { useLayout } from '@core/contexts/LayoutContext'
import { useAuth } from '@core/contexts/AuthContext'

const LoginPopUp = ({handleClose}) => {
    const { user, userData, setErrorAuth, refreshUserData } = useAuth()
    const { setDimm } = useLayout()

    const fileInput = useRef(null)

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

    useEffect(() => {
        setDimm(true)
        return () => {
            setDimm(false)
            setErrorAuth('')
        }
    }, [])

    return (
        <div css={style} className="fixed fullscreen-v flex-cs">
            <OutsideClickHandler onOutsideClick={handleClose} display="flex">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -10}} 
                    animate={{ opacity: 1, scale: 1, y: 0 , transition: { duration: 0.25, delay: 0.1}}} 
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 }}} 
                    className="pop-up flex-cc"
                >
                    <form className="flex-cc col" onSubmit={handleSubmit}>
                        <input type="file" ref={fileInput} name="avatar" id="avatar"/>
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

        @media (min-width: 720px) {
            width: 90%;
            max-width: 800px;
            min-width: 320px;
        }
    }

    img.illus{
        height: 200px;
        margin-left: 24px;

        @media (max-width: 720px) {
            margin-left: 0;
            margin-bottom: 32px;
        }
    }
    
    .pop-up{
        background: #fff;
        padding: 54px 0;
        width: 100%;
        border-radius: 12px;

        @media (max-width: 720px) {
            flex-direction: column;
            padding-bottom: 32px;
            width: 320px;
        }
    }

`

export default LoginPopUp