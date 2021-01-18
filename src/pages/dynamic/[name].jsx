import React from 'react'
import Styled from '@emotion/styled'
import { useRouter } from 'next/router'

const Dynamic = () => {
  const router = useRouter()
  const { name } = router.query

    return (
        <Wrapper>
            <h1>dynamic with {name}</h1>
        </Wrapper>
    )
}

const Wrapper = Styled.div(() =>`
    
`)

export default Dynamic