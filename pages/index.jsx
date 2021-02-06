import React, { useEffect } from 'react'
import { css } from '@emotion/react'
// import Link from 'next/link'
// import to from '@core/routepath'
import { useRouter } from 'next/router'

import MainLayout from '@components/layouts/MainLayout'
    
const Home = () => {
    const { query : { action }} = useRouter()

    useEffect(() => {
        console.log(action)
    }, [])

    return (
        <MainLayout style={style} directLogin={action === 'login'}>
            <section className="hero contain-size-xs">
                
            </section>
        </MainLayout>
    )
}

const style = css`
    
`
    
export default Home