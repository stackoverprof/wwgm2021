import React, { useState } from 'react'
import { css } from '@emotion/react'
import { AnimatePresence } from 'framer-motion'
import { MdPhotoLibrary } from 'react-icons/md'

import { useAuth } from '@core/contexts/AuthContext'
import { useLayout } from '@core/contexts/LayoutContext'
import UploadPopUp from '@components/molecular/PopUps/UploadPopUp'
import InitialAva from '@components/atomic/InitialAva'

const EditPhotoURL = ({size}) => {
    const [openUploadPopUp, setOpenUploadPopUp] = useState(false)
    
    const { userData } = useAuth()
    const { setDimm } = useLayout()

    const showUploadPopUp = {
        open: () => {
            setOpenUploadPopUp(true)
        },
        close: () => {
            setDimm(false)
            setOpenUploadPopUp(false)
        }
    }

    return (
        <div css={style}>
            <InitialAva size={size} src={userData.photoURL} displayName={userData.displayName}/>
            <div className="edit-cover full flex-ce">
                <div className="circle flex-cc" onClick={showUploadPopUp.open}>
                    <MdPhotoLibrary />
                </div>
            </div>
            <AnimatePresence exitBeforeEnter>
                {openUploadPopUp && <UploadPopUp handleClose={showUploadPopUp.close}/>}
            </AnimatePresence>
        </div>
    )
}

const style = css`
    position: relative;
    border-radius: 50%;
    margin: 20px 0;
    overflow: hidden;

    &:hover {
        .edit-cover {
            opacity: 1;
            color: #ffff;
            transition: all 0.25s, color 0.25s 0.2s;
        }
    }
    
    .edit-cover {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        color: #fff0;
        font-size: 22px;
        transition: all 0.25s, color 0.25s 0s;
        
        .circle {
            height: 100%;
            width: 100%;
            background: #0009;
        }
        
        svg {
            transition: 0.15s;
            &:hover {
                transform: scale(1.1);
                color: #46b9ee;
            }
        }

    }
`

export default EditPhotoURL