import React from 'react'
import { css } from '@emotion/react'

import BioOverview from '@components/molecular/Dashboard/BioOverview'
import BioEdit from '@components/molecular/Dashboard/BioEdit'

const Biodata = ({openEdit, editSwitch, setEditSwitch}) => {

    return (
        <div css={style}>
            {editSwitch ?
                <BioEdit setEditSwitch={setEditSwitch}/>
            :
                <BioOverview openEdit={openEdit}/>
            }
        </div>
    )
}

const style = css`
    
`

export default Biodata