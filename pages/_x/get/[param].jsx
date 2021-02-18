import React from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'

const GetDynamic = () => {
  const { query: { param, action }} = useRouter()

    return (
        <div css={style}>
            <h1>dynamic routing with {param} aksinya {action}</h1>
        </div>
    )
}

const style = css`

`

export default GetDynamic