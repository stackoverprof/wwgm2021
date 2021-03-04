import React from 'react'
import { css } from '@emotion/react'

const Attribution = () => {

    return (
        <div css={style}>
            <div className="inner contain-size-l flex-cs col">
                <a href="https://www.freepik.com/vectors/abstract">Abstract vector created by — macrovector</a>
                <a href="https://www.freepik.com/vectors/business">Business vector created by — jcomp</a>
                <a href="https://www.freepik.com/vectors/office">Office vector created by — stories</a>
                <a href='https://www.freepik.com/vectors/people'>People vector created by — stories</a>
                <a href='https://www.freepik.com/vectors/background'>Background vector created by — freepik</a>
                <a href='https://www.freepik.com/vectors/infographic'>Infographic vector created by — vectorjuice</a>    
            </div>
        </div>
    )
}

const style = css`
    padding: 32px 0;
    color: white;

    @media (max-width: 800px) {
        font-size: 14px;
        padding: 32px 12px;
    }
`

export default Attribution