import React from 'react'
import { css } from '@emotion/core'
import { BarLoader } from 'react-spinners'

const override = css`
    display: block;
    margin: 100px auto;
    text-align: center;
    width: 100px;
    height: 4px;
`

const Spinners = props => {
    return (
        <div className="sweet-loading">
            <BarLoader
                css={override}
                sizeUnit={'px'}
                size={60}
                color={'#cce5ff'}
                loading={props.loading}
            />
        </div>
    )
}

export default Spinners
