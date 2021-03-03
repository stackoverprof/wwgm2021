import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { v4 as uuid } from 'uuid'
import OutsideClickHandler from 'react-outside-click-handler'
import parse from 'url-parse'

import { useLayout } from '@core/contexts/LayoutContext'
import { useAuth } from '@core/contexts/AuthContext'
import FireFetcher from '@core/services/FireFetcher'
import { STORAGE } from '@core/services/firebase'
import InitialAva from '@components/atomic/InitialAva'
import Spinner from '@components/atomic/spinner/Circle'

const UploadPopUp = ({handleClose}) => {
    const [preview, setPreview] = useState({blob: '', name: '', loading: false})
    const [makeInitial, setMakeInitial] = useState(true)
    const [draggedOver, setDraggedOver] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user, userData } = useAuth()
    const { setGlobalAlert, setDimm } = useLayout()

    const fileInput = useRef({current: {file: [{name: ''}]}})

    const modifyInitial = (url) => {
        const parsed = parse(url, true)
        parsed.set('query', {...parsed.query, initial: makeInitial})

        return parsed.toString()
    }

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

    const updateUserData = async (url) => {
        await FireFetcher.editPhoto(user.uid, { photoURL: url })
            .then(() => {
                setGlobalAlert({error: false, body:'Foto profil telah diperbarui'})
                handleClose()
            }).catch(()=> {
                setGlobalAlert({error: true, body:'Gagal memperbarui. Refresh dan coba lagi'})
            })

        return setLoading(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        const image = fileInput.current.files[0]

        if (!image) {
            const url = modifyInitial(userData.photoURL)
            updateUserData(url)
            setGlobalAlert({error: false, body:'Foto profil telah diperbarui'})
            return setLoading(false)
        }

        if (!validateImage(image)) {
            setGlobalAlert({error: true, body:'Gambar tidak valid. Gunakan gif/jpeg/png (Max: 5MB)'})
            return setLoading(false)
        }

        const filename = generateFileName(image.name)
        const storageRef = STORAGE.ref('/Users/profile-pictures').child(filename)
        await storageRef.put(image)
            .catch(() => {
                setGlobalAlert({error: true, body:'Gagal memperbarui. Refresh dan coba lagi'})
                return setLoading(false)
            })
        await storageRef.getDownloadURL()
            .then(res => {
                const url = modifyInitial(res)
                updateUserData(url)
            })
            .catch(() => {
                setGlobalAlert({error: true, body:'Gagal memperbarui. Refresh dan coba lagi'})
                return setLoading(false)
            })
    }

    const handleChange = (e) => {
        setGlobalAlert('')
        setPreview({blob: '', name: '', loading: true})
        const image = e.target.files[0]

        if (!image) {
            setPreview({blob: '', name: '', loading: false})
            setGlobalAlert({error: true, body:'File tidak valid, coba lagi'})
            return e.target.value = '' 
        }
        
        if (!validateImage(image)) {
            setPreview({blob: '', name: '', loading: false})
            setGlobalAlert({error: true, body:'Gambar tidak valid. Gunakan gif/jpeg/png (Max: 5MB)'})
            return e.target.value = ''
        }

        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = (res) => {
            setPreview({blob: res.target.result, name: image.name, loading: false})
        }

    }

    useEffect(() => {
        const parsed = parse(userData.photoURL, true)
        setMakeInitial(JSON.parse(parsed.query.initial))
    
        setDimm(true)
        return () => {
            setDimm(false)
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
                    <InitialAva 
                        size={140} 
                        src={preview.blob ? preview.blob : userData.photoURL} 
                        loading={preview.loading}
                        override 
                        overrideValue={makeInitial} 
                        className="preview"
                        displayName={userData.displayName}
                    />
                    <form className="flex-cc col" onSubmit={handleSubmit}>
                        <div 
                            className={`file-drop-area ${draggedOver || preview.blob ? 'ready' : ''}`} 
                            onDragEnter={() => setDraggedOver(true)} 
                            onDragLeave={() => setDraggedOver(false)}
                        >
                            <span className="fake-btn">{preview.name ? 'Change File' : 'Choose File'}</span>
                            <span className="file-msg">{preview.name ? preview.name : 'or drag and drop files here'}</span>
                            <input 
                                type="file" 
                                ref={fileInput} 
                                onChange={handleChange} 
                                accept="image/x-png,image/gif,image/jpeg"
                                name="avatar"
                                id="avatar" 
                                className="file-input"
                            />
                        </div>
                        <div className="checkbox-container flex-cc">
                            <input 
                                type="checkbox" 
                                checked={makeInitial} 
                                onChange={(e) => setMakeInitial(e.target.checked)} 
                                name="show-initial" 
                                id="show-initial"
                            />
                            <label className="label-initial" htmlFor="show-initial">Tampilkan inisial nama</label>
                        </div>
                        <button type="submit">{loading ? <Spinner w={158} h={26} /> : 'Perbarui foto'}</button>
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
    }

    form {
        width: calc(100% - 96px);
        padding: 0 24px;
    }
    
    .pop-up {
        background: #fff;
        padding: 54px 0;
        width: 100%;
        border-radius: 12px;
    }

    img.preview {
        border: 1px solid #0003;
    }

    .file-drop-area {
        position: relative;
        width: 100%;
        height: 94px;
        display: flex;
        align-items: center;
        max-width: 100%;
        margin: 24px 0;
        padding: 0 25px;
        border: 1px dashed #0005;
        border-radius: 3px;
        transition: 0.2s;
        background-color: #0001;
        
        &.ready {
            border: 3px dashed #0005;
            background: #36a56855;
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

    .checkbox-container {
        margin-bottom: 24px;

        .label-initial {
            margin-left: 6px;
        }
    }

`

export default UploadPopUp