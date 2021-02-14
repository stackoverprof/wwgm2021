import React from 'react'
import { css } from '@emotion/react'

import TryOut from '@comps-molecular/Dashboard/TryOut'
import Biodata from '@comps-molecular/Dashboard/Biodata'

const DashContent = ({openEdit, activeTab, setActiveTab, editSwitch, setEditSwitch}) => {

    return (
        <div css={style}>
            <div className="tabs contain-size-sm full-w flex-ec">
                <h2 onClick={() => setActiveTab('Try Out')} className={`full ${activeTab === 'Try Out' ? 'active-tab' : ''}`}>
                    Try Out
                </h2>
                <hr className="vr"/>
                <h2 onClick={() => setActiveTab('Biodata')} className={`full ${activeTab === 'Biodata' ? 'active-tab' : ''}`}>
                    Biodata
                </h2>
            </div>
            <div className="frame contain-size-s">
                { activeTab === 'Try Out' && <TryOut /> }
                { activeTab === 'Biodata' && <Biodata openEdit={openEdit} editSwitch={editSwitch} setEditSwitch={setEditSwitch}/> }
            </div>
        </div>
    )
}

const style = css`
    .tabs {
        padding: 18px 0;

        hr {
            height: 48px;
        }

        h2 {
            font-family: Poppins;
            font-weight: normal;
            font-size: 24px;
            text-align: center;

            color: #969696;

            &.active-tab {
                -webkit-text-stroke-width: 1px;
                color: var(--army);
                letter-spacing: 0.04em;
            }

            @media (max-width: 600px) {
                font-size: 20px;
            }
        }

    }
`

export default DashContent