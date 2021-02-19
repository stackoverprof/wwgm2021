import React from 'react'
import { css } from '@emotion/react'
import { FaPlus } from 'react-icons/fa'

const UserDetail = ({item}) => {

    const handleExamAccess = {
        add: e => {
            e.preventDefault()
            alert('ha')
        },
        remove: e => {
            e.preventDefault()
            alert('rem')
        }
    }

    return (
    <>
        <hr className="fade"/>

        <div css={style} className="Full flex-bs">
            <table>
                <tbody>
                    <tr>
                        <td><strong>UID</strong></td>
                        <td className="data">&nbsp; : &nbsp; {item.uid}</td>
                    </tr>
                    <tr>
                        <td><strong>Display Name</strong></td>
                        <td className="data">&nbsp; : &nbsp; {item.displayName}</td>
                    </tr>
                    <tr>
                        <td><strong>Kontak</strong></td>
                        <td className="data">&nbsp; : &nbsp; {item.contact}</td>
                    </tr>
                    <tr>
                        <td><strong>Provinsi</strong></td>
                        <td className="data">&nbsp; : &nbsp; {item.province}</td>
                    </tr>
                    <tr>
                        <td><strong>Kota/Kab</strong></td>
                        <td className="data">&nbsp; : &nbsp; {item.city}</td>
                    </tr>
                    <tr>
                        <td><strong>Sekolah</strong></td>
                        <td className="data">&nbsp; : &nbsp; {item.school}</td>
                    </tr>
                </tbody>
            </table>
            <div className="bottom">
                <p><strong>Akses Try Out :</strong></p>
                {item.examsAccess.map((examId, i) => (
                    <p className="exam" key={i}>{examId}</p>
                    ))}
                {item.examsAccess.length === 0 && 
                    <p className="exam">—</p>
                }
                <form className="flex-sc" onSubmit={handleExamAccess.add}>
                    <input type="text"/>
                    <button className="btn-icon green">
                        <FaPlus className="icon"/> 
                    </button>
                </form>
            </div>
        </div>
    </>
    )
}

const style = css`
    margin: 24px 0;
    width: calc(100% - 48px);

    @media (max-width: 950px) {
        flex-direction: column;
    }

    margin-top: 0;
    padding-top: 24px;

    .bottom {
        width: 45%;

        @media (max-width: 950px) {
            width: 100%;
        }
    }

    p.exam {
        margin: 6px 0;
    }

    table {
        td.data {
            word-break: break-all;
        }
    }
`

export default UserDetail