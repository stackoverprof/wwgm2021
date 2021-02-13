import React from 'react'
import { css } from '@emotion/react'

const InitialAva = ({children}) => {

    return (
        <div css={style} className="flex-cc">
            {children}
        </div>
    )
}

const style = css`
    position: relative;

    img {
        position: relative;
    }
    
`

export default InitialAva