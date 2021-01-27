import React from 'react'
import { css } from '@emotion/css'
import { useRouter } from 'next/router'

const Dynamic = () => {
  const router = useRouter()
  const { name } = router.query

    return (
        <div className={style}>
            <h1>dynamic with {name}</h1>
        </div>
    )
}

const style = css`

`

export default Dynamic