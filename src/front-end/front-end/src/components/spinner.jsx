import React from 'react'
const Spinner = ()=>{
    return (
        <div data-testid="spinner" className="d-flex justify-content-center align-items-center h-25">
          <div className="spinner-border" role="status">
            <span  className="visually-hidden">Loading...</span>
          </div>
        </div>)
}
export default Spinner