import React from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'

const GetDynamic = () => {
  const router = useRouter()
  const { param } = router.query

    return (
        <div css={style}>
            <h1>dynamic routing with {param}</h1>
        </div>
    )
}

const style = css`

`

export default GetDynamic