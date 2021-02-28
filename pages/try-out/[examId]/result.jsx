import React from 'react'
import { css } from '@emotion/react'

const TryOutRank = () => {

    return (
        <div css={style}>

            <h1>Coba jsx</h1>
             
             <style jsx>{stylesheet}</style>
        </div>
    )
}

const stylesheet = `
    h1 {
        color: pink;
    }
`

const style = css`
    
`

export default TryOutRank