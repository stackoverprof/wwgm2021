import React from 'react'
import { css } from '@emotion/react'

const Gallery = ({title, images}) => {

    return (
        <div css={style} className="full-w flex-cc col">
            <div className="contain-size-m">
                <h3 className="full-w">{title}</h3>
                <div className="gallery full-w">
                    {images.map((image, i) => (
                        <div className="item-img" key={i}>
                            <img src={image} alt="Dokumentasi wwgm tahun yang lalu"/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const style = css`
    margin-top: 32px;

    h3 {
        color: var(--army);
        font-weight: 700;
        font-size: 54px;

        @media (max-width: 572px) {
            text-align: center;
            font-size: 42px;
        }
    }

    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 20px;
        padding: 20px 0;

        .item-img {
            width: 100%;
            height: 220px;
            border-radius: 6px;
            overflow: hidden;

            img {    
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
`

export default Gallery