import React from 'react'
import { css } from '@emotion/react'

import BioOverview from '@components/molecular/Dashboard/BioOverview'
import BioEdit from '@components/molecular/Dashboard/BioEdit'

const Biodata = ({editSwitch, setEditSwitch}) => {

    return (
        <div css={style}>
            {editSwitch ?
                <BioEdit setEditSwitch={setEditSwitch}/>
            :
                <BioOverview />
            }
        </div>
    )
}

const style = css`
    
`

export default Biodata