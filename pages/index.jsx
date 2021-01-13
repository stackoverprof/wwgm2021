import React from 'react'
import Styled from '@emotion/styled'
import Link from 'next/link'
import { useAuth } from '../core/contexts/AuthContext'
    
const Home = () => {
    const { authState } = useAuth()

    return (
        <Wrapper>
            <h1><strong>Next</strong>PLANET</h1>
            <p>Clean-code practice oriented, It's a NextJS practical starter-template with a freedom of choice</p>
            <h2>START-UP: AUTH ONLY EMAIL </h2>
            <div className="links">
                {authState == 'guest' && <Link href="/login"><button>Login</button></Link>}
                {authState == 'guest' && <Link href="/register"><button>Register</button></Link>}
                {authState == 'user' && <Link href="/dashboard"><button>Dashboard</button></Link>}
            </div>
            <svg width="420" height="337.5" viewBox="0 0 56 45" fill="#ddd" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.1879 0C19.1879 0 12.1377 4.3 8.23771 10.75C8.13771 10.75 8.0381 10.7998 7.8881 10.7998C3.3381 12.2498 0.638299 14.65 0.0882987 17.75C-0.461701 20.9 1.5881 24.1996 5.3881 27.0996C7.4881 37.2996 16.4879 45 27.1879 45C35.1879 45 42.2381 40.7 46.1381 34.25C50.6881 32.85 53.6877 30.4 54.2377 27.25C54.7877 24.15 52.8879 20.7998 48.9379 17.7998C46.8379 7.64981 37.8879 0 27.1879 0ZM9.23771 0.837891C8.85021 0.837891 8.46291 0.975 8.18791 1.25C7.88791 1.55 7.73771 1.8998 7.73771 2.2998C7.73771 2.6998 7.88791 3.09961 8.18791 3.34961C8.43791 3.59961 8.83771 3.7998 9.23771 3.7998C9.63771 3.7998 10.0375 3.64961 10.2875 3.34961C10.5875 3.04961 10.7377 2.6998 10.7377 2.2998C10.7377 1.8998 10.5875 1.5 10.2875 1.25C10.0125 0.975 9.62521 0.837891 9.23771 0.837891ZM27.1879 3C37.8379 3 46.4379 11.75 46.4379 22.5C46.4379 25.85 45.5881 29 44.1381 31.75C43.9381 31.8 43.7883 31.8504 43.5883 31.9004C38.5883 33.0504 32.1875 33.0496 25.5375 31.8496C18.8875 30.6996 12.8375 28.5002 8.53752 25.7002C8.38752 25.6002 8.2381 25.5004 8.1381 25.4004C7.9881 24.4504 7.93791 23.4502 7.93791 22.4502C7.93791 11.7502 16.5379 3 27.1879 3ZM25.6879 8.5C25.1575 8.5 24.6488 8.71071 24.2737 9.08579C23.8986 9.46086 23.6879 9.96957 23.6879 10.5C23.6879 11.0304 23.8986 11.5391 24.2737 11.9142C24.6488 12.2893 25.1575 12.5 25.6879 12.5C26.2183 12.5 26.7271 12.2893 27.1021 11.9142C27.4772 11.5391 27.6879 11.0304 27.6879 10.5C27.6879 9.96957 27.4772 9.46086 27.1021 9.08579C26.7271 8.71071 26.2183 8.5 25.6879 8.5ZM6.28752 14.7002C5.38752 17.1502 4.8881 19.75 4.8881 22.5V22.75C3.4881 21.15 2.83752 19.6 3.03752 18.25C3.28752 16.9 4.38752 15.7002 6.28752 14.7002ZM40.6879 17.5C39.8923 17.5 39.1292 17.8161 38.5666 18.3787C38.004 18.9413 37.6879 19.7044 37.6879 20.5C37.6879 21.2956 38.004 22.0587 38.5666 22.6213C39.1292 23.1839 39.8923 23.5 40.6879 23.5C41.4836 23.5 42.2466 23.1839 42.8092 22.6213C43.3718 22.0587 43.6879 21.2956 43.6879 20.5C43.6879 19.7044 43.3718 18.9413 42.8092 18.3787C42.2466 17.8161 41.4836 17.5 40.6879 17.5ZM49.4877 22.25C50.8877 23.85 51.5383 25.4 51.3383 26.75C51.0883 28.1 49.9383 29.3498 48.0883 30.2998C48.9883 27.8498 49.4877 25.25 49.4877 22.5V22.25ZM23.1879 22.5498C22.1933 22.5498 21.2395 22.9449 20.5363 23.6482C19.833 24.3514 19.4379 25.3052 19.4379 26.2998C19.4379 27.2944 19.833 28.2482 20.5363 28.9515C21.2395 29.6547 22.1933 30.0498 23.1879 30.0498C24.1825 30.0498 25.1363 29.6547 25.8396 28.9515C26.5428 28.2482 26.9379 27.2944 26.9379 26.2998C26.9379 25.3052 26.5428 24.3514 25.8396 23.6482C25.1363 22.9449 24.1825 22.5498 23.1879 22.5498V22.5498ZM9.23771 29.5498C13.4877 31.8498 18.8875 33.6998 25.0375 34.7998C28.5875 35.4498 32.0377 35.75 35.2377 35.75C37.5877 35.75 39.7375 35.5998 41.7875 35.2998C38.1875 39.3998 32.9879 42 27.1879 42C19.0379 42 12.0377 36.8498 9.23771 29.5498ZM54.2377 39.7871C53.8502 39.7871 53.4629 39.9252 53.1879 40.2002C52.8879 40.5002 52.7377 40.85 52.7377 41.25C52.7377 41.65 52.8879 42.0498 53.1879 42.2998C53.4879 42.5998 53.8377 42.75 54.2377 42.75C54.6377 42.75 55.0375 42.5998 55.2875 42.2998C55.5875 41.9998 55.7377 41.65 55.7377 41.25C55.7377 40.85 55.5875 40.4502 55.2875 40.2002C55.0125 39.9252 54.6252 39.7871 54.2377 39.7871Z" fill="#ddd"/>
            </svg>
        </Wrapper>
    )
}
    
const Wrapper = Styled.div(() =>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    h1{
        font-size: 54px;
        margin: 120px 0 8px 0;
    }

    h2{
        font-size: 16px;
        font-weight: bold;
    }

    p{
        margin-bottom: 32px;
        max-width: 520px;
        width: 90%;
        min-width: 320px;
        text-align: center;
    }

    svg{
        position: fixed;
        bottom: -100px;
        z-index: -1;
    }

`)
    
export default Home