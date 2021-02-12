import React, { useState } from 'react'
import { css } from '@emotion/react'

const DashboardContent = () => {
    const [activeTab, setActiveTab] = useState('Try Out')

    return (
        <div css={style}>
            <div className="tabs contain-size-sm full-w flex-ec">
                <h2 onClick={() => setActiveTab('Try Out')} className={`${activeTab === 'Try Out' ? 'active-tab' : ''}`}>
                    Try Out
                </h2>
                <hr className="vr"/>
                <h2 onClick={() => setActiveTab('Biodata')} className={`${activeTab === 'Biodata' ? 'active-tab' : ''}`}>
                    Biodata
                </h2>
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
            }
        }

    }
`

export default DashboardContent