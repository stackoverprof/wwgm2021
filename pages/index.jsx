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
        <MainLayout style={style} className="flex-sc col" directLogin={action === 'login'} noClearance>
            <section className="hero flex-cc">
                <div className="background flex-cc">
                    <div className="contain-size-s flex-cc col">
                        <img src="/img/logo-wwgm-full.webp" alt="logo wwgm 2021"/>
                        <button className="bordered-bold orange">Daftar Sekarang!</button>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

const style = css`
    
    section.hero{
        width: 100%;
        
        .background{
            min-width: 900px;
            width: 100%;
            height: 100%;
            padding: 76px 0 42px 0;
            background: url('/img/home/hero-left.webp'), url('/img/home/hero-right.webp'), #0F1A12;
            background-position: left, right, center;
            background-size: cover;
            background-repeat: no-repeat;
            
            @media (min-width: 1060){
                background-size: contain !important;
            }
        }

        
        img{
            height: 210px;
            margin-bottom: 24px;
            object-fit: contain;
        }
    }
    
`
    
export default Home