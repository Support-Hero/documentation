import React from 'react'
import './rostercreate.css'
import { api } from '../api'
const RosterUpdate = ({ token,
    
    setOpen,
    workerName, setWorkerName,
    shiftStart, setShiftStart,
    shiftEnd, setShiftEnd,
    breakEnd, setBreakEnd,
    breakStart, setBreakStart,
    breakStatus, setBreakStatus,
    date, setDate, id }) => {

    const updates = async (token,
        setOpen,
        date,
        shiftStart, shiftEnd,
        breakStart, breakEnd, breakStatus, id) => {
        const res = await fetch(api + "/rosters/" + id, {
            method: "PUT",
            body: JSON.stringify(
                {
                    date: date,
                    shiftStart: shiftStart,
                    shiftEnd: shiftEnd,
                    breakStart: breakStart,
                    breakEnd: breakEnd,
                    break: breakStatus
                }
            ),
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()
        window.location.reload()
        // reset all input
        setOpen(false)

    }
    const deleteShift = async (token,id) => {
        const res = await fetch(api + "/rosters/" + id, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        // const data = await res.json()
        window.location.reload()
        // reset all input
        setOpen(false)
    }
    const updateshiftModal = (token,
        
        setOpen,
        workerName, setWorkerName,
        shiftStart, setShiftStart,
        shiftEnd, setShiftEnd,
        breakEnd, setBreakEnd,
        breakStart, setBreakStart,
        breakStatus, setBreakStatus,
        date, setDate, id) => (
        <div className='bg-black w-100 bg-opacity-75 pt-5' style={{ height: "120vh", position: "absolute", top: "0", zIndex: 1 }}>
            <div className="bg-white mx-auto p-5" id='modal-box'>
                <form
                    className="p-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        updates(
                            token,
                            setOpen,
                           date,
                            shiftStart, shiftEnd,
                            breakStart, breakEnd, breakStatus, id
                        )
                    }}
                >
                    <h5 > Update Shift</h5>
                    <hr />
                    <div className="mb-3">
                        <label htmlFor="firstname" className="form-label"> worker name: {workerName}</label>
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">
                            Select Date
                        </label>
                        <input
                            required
                            id='date'
                            type="date"
                            value={date}
                            onChange={(e) => {
                                e.preventDefault();
                                setDate(e.target.value);
                            }}
                            className="form-control"
                        />
                    </div>
                    <div className="d-flex mb-3 ">
                        <div className="d-flex flex-column " style={{ marginRight: "20px" }}>
                            <label htmlFor="shiftStart" className="form-label">
                                Shift Start
                            </label>
                            <input required
                                id='shiftStart'
                                className="form-control"
                                aria-label='shiftStart'
                                type="time"
                                value={shiftStart}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setShiftStart(e.target.value);
                                }}
                            />
                        </div>
                        <div className="d-flex flex-column">
                            <label htmlFor="shiftEnd" className="form-label">
                                Shift End
                            </label>
                            <input required
                                id='shiftEnd'
                                className="form-control"
                                type="time"
                                aria-label='shiftEnd'
                                value={shiftEnd}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setShiftEnd(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="d-flex mb-3">
                        <label htmlFor="breakstatus" className="form-label">
                            Break:
                        </label>
                        <select aria-label='breakstatus' value={breakStatus} className="mx-1" onChange={(e) => setBreakStatus(e.target.value)}>
                            <option value="-">-Select-</option>
                            <option value="false">No</option>
                            <option value='true'>Yes</option>
                        </select>
                    </div>
                    {breakStatus && <div className="d-flex mb-3">
                        <div className="d-flex flex-column" style={{ marginRight: "20px" }}>
                            <label htmlFor="breakStart" className="form-label">
                                Break Start
                            </label>
                            <input
                                id='breakStart'
                                className="form-control"
                                type="time"
                                aria-label='breakStart'
                                value={breakStart}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setBreakStart(e.target.value);
                                }}
                            />
                        </div>
                        <div className="d-flex flex-column">
                            <label htmlFor="breakEnd" className="form-label">
                                Break End
                            </label>
                            <input required
                                id='breakEnd'
                                className="form-control"
                                type="time"
                                aria-label='breakEnd'
                                value={breakEnd}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setBreakEnd(e.target.value);
                                }}
                            />
                        </div>
                    </div>}
                    <div className="d-flex justify-content-md-between">
                        <button
                            className="btn btn-secondary"
                            onClick={(e) => {
                                e.preventDefault();
                                setOpen(false)
                                setWorkerName()
                                setDate()
                                setShiftStart()
                                setShiftEnd()
                                setBreakStart()
                                setBreakEnd()
                                setBreakStatus(false)
                            }}
                        >
                            Close
                        </button>
                        <button onClick={(e)=>{e.preventDefault();deleteShift(token,id)}} className="btn btn-primary mx-2">
                            Delete{" "}
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Save{" "}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
    return (
        <>
            {updateshiftModal(token,
                
                setOpen,
                workerName, setWorkerName,
                shiftStart, setShiftStart,
                shiftEnd, setShiftEnd,
                breakEnd, setBreakEnd,
                breakStart, setBreakStart,
                breakStatus, setBreakStatus,
                date, setDate, id)}
        </>)
}
export default RosterUpdate