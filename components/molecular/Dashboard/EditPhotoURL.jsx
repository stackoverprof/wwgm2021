import React from 'react'
import { css } from '@emotion/react'
import { useAuth } from '@core/contexts/AuthContext'

const EditPhotoURL = () => {
    const { userData } = useAuth()

    return (
        <div css={style}>
            <img className="profile full" src={userData.photoURL} alt=""/>
            <div className="edit full flex-ce">
                <div className="slider">

                </div>
            </div>
        </div>
    )
}

const style = css`
    position: relative;
    width: 84px;
    height: 84px;
    border-radius: 50%;
    margin: 20px;
    overflow: hidden;

    img.profile {
        position: absolute;
        top: 0;
        left: 0;
    }

    div.edit{
        position: absolute;
        background: #4795;
    }

    .slider {
        height: 40%;
        width: 100%;
        background: #0009;
    }

`

export default EditPhotoURL