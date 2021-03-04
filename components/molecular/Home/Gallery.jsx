import React from 'react'
import { css } from '@emotion/react'

const images = {
    tryOut: [
        'https://firebasestorage.googleapis.com/v0/b/areks-gm.appspot.com/o/Documentation%2FIMG_6886-min.webp?alt=media&token=52b26576-c4ce-4f91-9e90-bf3279d68f8d',
        'https://firebasestorage.googleapis.com/v0/b/areks-gm.appspot.com/o/Documentation%2FIMG_6814-min.webp?alt=media&token=53f9ddb5-ac65-4535-92d3-0ba86dc1c544',
        'https://firebasestorage.googleapis.com/v0/b/areks-gm.appspot.com/o/Documentation%2FIMG_6869-min.webp?alt=media&token=8d23b12d-f593-460e-b20a-868b86d80e54',
        'https://firebasestorage.googleapis.com/v0/b/areks-gm.appspot.com/o/Documentation%2FIMG_6891-min.webp?alt=media&token=1f40ef0c-740c-4a15-a246-82d970004f4e',
        'https://firebasestorage.googleapis.com/v0/b/areks-gm.appspot.com/o/Documentation%2FIMG_6849-min.webp?alt=media&token=b6c9a4e9-d0a3-4fa1-b55e-bfb2e8e1ce39',
        'https://firebasestorage.googleapis.com/v0/b/areks-gm.appspot.com/o/Documentation%2FIMG_6824-min.webp?alt=media&token=ae359284-4cbb-4baf-8c7a-8e2ec40b20ae'
    ],
    facultyFair: [
        '',
        '',
        '',
        '',
        '',
        '',
    ]
}

const Gallery = () => {

    return (
        <div css={style} className="full-w flex-cc col">
            <div className="contain-size-m">
                <h3 className="full-w">Try Out</h3>
                <div className="gallery full-w">
                    {images['tryOut'].map((image, i) => (
                        <img src={image} alt="Dokumentasi wwgm tahun yang lalu" key={i}/>
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

        img {
            width: 100%;
            height: 220px;
            object-fit: cover;
            border-radius: 6px;
        }
    }
`

export default Gallery