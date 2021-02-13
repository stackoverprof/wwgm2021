import React, { useEffect } from 'react'
import { css } from '@emotion/react'

import { useLayout } from '@core/contexts/LayoutContext'
import BioOverview from '@comps-molecular/Dashboard/BioOverview'
import BioEdit from '@comps-molecular/Dashboard/BioEdit'

const Biodata = ({openEdit, editSwitch, setEditSwitch}) => {

    const { setGlobalAlert } = useLayout()

    useEffect(() => {

        return () => setGlobalAlert('')
    }, [])

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