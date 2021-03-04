import React from 'react'
import { css } from '@emotion/react'

const Videotron = () => {

    return (
        <div css={style} className="full-w flex-cc">
            <div className="videotron-inner contain-size-l flex-cc">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/q0yjMWdSIoc" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <div className="text-content">
                    <h2>Dokumentasi</h2>
                    <p>Keseruan Wara-Wiri Gadjah Mada 2020</p>
                </div>
            </div>
        </div>
    )
}

const style = css`
    padding: 60px 0;

    background: url('/img/assets/docu.svg'), #0F1A12;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    color: white;

    iframe {
        margin: 0 54px 0 0;
        border-radius: 8px;
    }

    h2 {
        font-weight: 600;
        font-size: 36px;
        margin-bottom: 12px;
    }

    p {
        font-size: 24px;
        max-width: 252px;
    }
    
    .text-content {
        margin-right: 24px;
    }
    
    @media (max-width: 800px) {
        .videotron-inner {
            flex-direction: column-reverse;
        }

        .text-content {
            margin-right: 0;
        }

        h2, p {
            text-align: center;
        }

        iframe {
            width: 90%;
            margin: 48px 0 0 0;
        }
    }
`

export default Videotron