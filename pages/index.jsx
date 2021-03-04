import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import axios from 'axios'

import { useLayout } from '@core/contexts/LayoutContext'
import documentation from '@core/utils/documentation.json'
import HomeLayout from '@components/layouts/HomeLayout'
import LoginPopUp from '@components/molecular/PopUps/LoginPopUp'
import Advantages from '@components/atomic/Advantages'
import CardDisplay from '@components/atomic/CardDisplay'
import IntroBox from '@components/molecular/Home/IntroBox'
import AdvantagesBar from '@components/atomic/AdvantagesBar'
import Gallery from '@components/molecular/Home/Gallery'
import Videotron from '@components/molecular/Home/Videotron'

// [!TODO] : footer bikin

const Home = () => {
    const [openLoginPop, setOpenLoginPop] = useState(false)
    const [displayedExams, setDisplayedExams] = useState([])
    const { setDimm } = useLayout()

    const showLogin = {
        open: () => {
            setOpenLoginPop(true)
        },
        close: () => {
            setOpenLoginPop(false)
            setDimm(false)
        }
    }
    
    const fetchData = async () => {
        await axios.post('/api/public/exams/get-displayed-exams')
            .then(res => setDisplayedExams(res.data.body))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <HomeLayout css={style.page} title="Selamat datang!" className="flex-sc col" noClearance>
            
            <section css={style.hero}>
                <div className="background">
                    <div className="contain-size-s flex-cc col">
                        <img src="/img/logo-wwgm-full.webp" alt="logo wwgm 2021" className="hero-img"/>
                        <button onClick={showLogin.open} className="hero-button bordered-bold orange">Daftar Sekarang!</button>
                        {openLoginPop && <LoginPopUp handleClose={showLogin.close}/>}
                    </div>
                </div>
            </section>

            <section id="try-out" css={style.displayer}>
                <div className="contain-size-l flex-bs">
                    <div className="left flex-cs col">
                        <h1>TRY OUT NASIONAL UTBK 2021</h1>
                        <hr/>
                        <Advantages />
                    </div>
                    <div className="right flex-bs">
                        <CardDisplay examId={displayedExams[0]} title="SAINTEK" i={0} refreshData={fetchData}/>
                        <CardDisplay examId={displayedExams[1]} title="SOSHUM" i={1} refreshData={fetchData}/>
                    </div>
                </div>
            </section>

            <section css={style.intro}>
                <div className="inner flex-cc col">
                    <div className="text-container">
                        <h2>Apa Sih WWGM 2021?</h2>
                    </div>
                    <hr className="head-divider full-w"/>
                    <IntroBox />
                </div>
            </section>

            <section css={style.advantages}>
                <div className="inner contain-size-sm">
                    <AdvantagesBar />
                </div>
            </section>

            <section id="dokumentasi" css={style.documentation}>
                <div className="inner flex-cc col">
                    <Videotron />
                    <Gallery title="Try Out" images={documentation.tryOut}/>
                    <Gallery title="Faculty Fair" images={documentation.facultyFair}/>
                    <Gallery title="Talk Show" images={documentation.talkShow}/>
                </div>
            </section>

            <section css={style.cta}>
                <div className="inner contain-size-m flex-bc">
                    <div className="content flex-cs col">
                        <h3>Tunggu apa lagi? Jadilah bagian dari event ini</h3>
                        <button className="bordered-bold">Daftar sekarang!</button>
                    </div>
                    <img src="/img/illus/books.webp" alt="books illustration"/>
                </div>
            </section>

        </HomeLayout>
    )
}

const style = {
    page: css`

    `,

    documentation: css`
        padding: 80px 0 20px 0;

    `,

    advantages: css`
        padding: 80px 0;
    `,

    cta: css`
        h3 {
            font-family: Poppins;
            font-weight: 600;
            font-size: 32px;
            color: var(--army);
        }

        button {
            margin-top: 24px;
            font-weight: 700;

            &:hover {
                background: var(--army);
            }
        }

        img {
            margin-top: 32px;
        }

        @media (max-width: 660px) {
            margin-top: 24px;

            .content {
                width: 100%;
                align-items: center;
            }

            h3 {
                text-align: center;
            }
            
            .inner {
                flex-direction: column;
            }
        }
    `,

    intro: css`

        .inner {
            overflow: hidden;
        }

        .text-container {
            padding: 0 72px;
            background: white;
            
            @media (max-width: 760px) {
                padding: 0 24px;
            }
            
            h2 {
                font-family: Poppins;
                font-weight: 600;
                font-size: 40px;
                text-align: center;
                color: #0B4D29;
                
                @media (max-width: 760px) {
                    font-size: 32px;
                }
            }
        }

        hr.head-divider {
            border: 2px solid #0002;
            position: relative;
            top: -30px;
            z-index: -1;
        }
    `,

    displayer: css`
        padding: 48px 0;
        
        > div {
            @media (max-width: 1000px) {
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }
        }

        .left {
            padding: 14px 20px 0 20px;

            @media (max-width: 1000px) {
                justify-content: center;
                align-items: center;
            }
        }
        
        .right {
            width: 100%;
            max-width: 538px;

            @media (max-width: 1000px) {
                width: 80%;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        }

        h1 {
            max-width: 360px;
            font-family: Poppins;
            font-weight: 800;
            font-size: 34px;
            color: var(--army);
            margin-bottom: 24px;
            
            @media (max-width: 1000px) {
                text-align: center;
            }

            @media (max-width: 500px) {
                max-width: 320px;
                font-size: 28px;
            }
        }

        hr {
            width: 300px;
            border: 1px solid #0003;
        }

        .display-fallback {
            border: 1px solid #0004;
            height: 300px;
            border-radius: 12px;
            padding: 24px;
            margin-top: 24px;
            width: 400px;
            
            @media (max-width: 1000px) {
                margin-top: 0;
                width: 300px;
            }

            p {
                color: #0008;
            }
        }
    `,

    hero: css`
        .background {
            width: 100%;
            height: 100%;
            padding: 76px 0 42px 0;
            background: url('/img/home/hero-left.webp'), url('/img/home/hero-right.webp'), #0F1A12;
            background-position: top left, top right, center;
            background-repeat: no-repeat;
	        background-attachment: fixed;

            @media (max-width: 790px) {
                background-position: top center, top center, center;
            }
        }

        .hero-img {
            height: 210px;
            margin-bottom: 24px;
            object-fit: contain;
        }

        .hero-button {
            position: relative;

            @media (max-width: 720px){
                top: -20px;
                font-size: 16px;
            }
        }
    `
}

    
export default Home
