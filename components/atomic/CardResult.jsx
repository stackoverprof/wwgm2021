import React, { useState } from 'react'
import { css } from '@emotion/react'
import { FaTimes } from 'react-icons/fa'
import parseHTML from 'html-react-parser'

const CardResult = ({item, openDropper, setOpenDropper, num}) => {
    
    return (
        <div css={style} className="full-w flex-c col">
            <div className="upper flex-bc">
                <div className="left full-w flex-bc">
                    <div className="number flex-cc">
                        <p>{num}</p>
                    </div>
                    <p className="smhide">Jawaban :</p>
                    <div className="answer flex-bc">
                        <p className={`letter ${item.correctness ? 'green' : 'red'}`}>{item.userAnswer ? item.userAnswer : '-'}</p>
                        <p className="letter gray">{item.body}</p>
                    </div>
                    <p className="icon flex-cc">{item.correctness ? '' : <FaTimes color="#b31d2a88" />}</p>
                    <p className="smhide level">{!item.level ? '-' : (item.level == 1 ? 'Mudah' : (item.level == 2 ? 'Sedang' : 'Sulit'))}</p>
                </div>
                <button onClick={() => setOpenDropper(openDropper === num ? null : num)} className="pembahasan">Pembahasan</button>
            </div>
            {openDropper === num && <Dropper item={item} />}
        </div>
    )
}

const Dropper = ({item}) => {
    const [openQuestionInfo, setOpenQuestionInfo] = useState(false)

    return (
        <>
            <hr className="fade-flip"/>
            <div className="dropper">
                <div className="explanation-info">{parseHTML(item.explanation)}</div>
                <div className="flex-bc bar-q">
                    <button onClick={() => setOpenQuestionInfo(!openQuestionInfo)} className="show-question no-btn">
                        {!openQuestionInfo ? 'Lihat Soal' : 'Tutup Soal'}
                    </button>
                    <p className="anti-smhide level">{!item.level ? '-' : (item.level == 1 ? 'Mudah' : (item.level == 2 ? 'Sedang' : 'Sulit'))}</p>
                </div>
                {openQuestionInfo && (
                    <div className="question-info">
                        <div className="question-body">{parseHTML(item.questionInfo.body)}</div>
                        {item.questionInfo.options.map((opt, i) => (
                            <div className={`flex-ss ${item.body === opt.option ? 'bold' : ''}`} key={i}>
                                <p className="indicator">{opt.option}.</p>
                                <p>{opt.body}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

const style = css`
    border: 1px solid #0005;
    border-radius: 8px;
    margin: 8px 0;

    .upper {
        height: 48px;
        padding: 0 6px;
    }

    p.indicator {
        min-width: 24px;
        margin-right: 4px;

    }
    
    .bar-q {
        margin-top: 12px;
    }
        
    p.level {
        min-width: 64px;
    }
        
    .bold p{    
        font-weight: 700;
        color: var(--army);
    }
    
    button.show-question {        
        &:hover {
            text-decoration: underline;
        }
    }

    .dropper {
        padding: 24px;
    }

    .question-body {
        margin-bottom: 12px;
    }

    .question-info {
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid #0003;
    }

    button.pembahasan {
        height: 36px;
        padding: 0 12px;
        font-size: 16px;
        border-radius: 6px;
        background: #0000000f;
        color: #0008;
        box-shadow: none;

        &:hover {
            background: #00000022;
        }
    }

    .smhide{
        @media (max-width: 600px) {
            display: none;
        }
    }
    .anti-smhide{
        @media (min-width: 600px) {
            display: none;
        }
    }

    .answer {
        width: 80px;
    }

    .left {
        max-width: 400px;
        margin-right: 24px;
    }

    p.icon {
        width: 20px;
    }

    .number {
        width: 38px;
        height: 38px;
        background: var(--army);
        border-radius: 6px;
        
        p {
            font-family: Poppins;
            font-size: 20px;
            font-weight: 600;
            color: white;
        }
    }

    .explanation-info {
        padding-bottom: 12px;
        margin-bottom: 20px;
        border-bottom: 1px solid #0003;
    }

    p.letter {
        font-family: Poppins;
        font-weight: 700;
        font-size: 24px;
        width: 32px;
        text-align: center;
        
        &.green {
            color: #268651;
        }
        
        &.red {
            color: #b31d2aaa;
        }
        
        &.gray {
            color: #0005;
        }
    }
    
`

export default CardResult