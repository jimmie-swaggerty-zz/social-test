import React from 'react'

const DimLoader = (props) => {
    return (
        <div className='d-flex row align-items-center justify-content-center' id="loader">
            <div className='col-auto'>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default DimLoader