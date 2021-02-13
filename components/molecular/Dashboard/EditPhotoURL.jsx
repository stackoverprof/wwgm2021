import React from 'react'
import { css } from '@emotion/react'
import { useAuth } from '@core/contexts/AuthContext'

import InitialAva from '@comps-atomic/InitialAva'

const EditPhotoURL = () => {
    const { userData } = useAuth()

    return (
        <div css={style}>
            <InitialAva size={84} src={userData.photoURL}/>
        </div>
    )
}

const style = css`
    position: relative;
    border-radius: 50%;
    margin: 20px;
    overflow: hidden;
`

export default EditPhotoURL