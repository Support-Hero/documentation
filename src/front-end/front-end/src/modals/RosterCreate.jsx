import React from 'react'
import './rostercreate.css'
import { api } from '../api'
const RosterCreate = ({
    token,
    workerlist,
    setOpen,
    workerName, setWorkerName,
    shiftStart, setShiftStart,
    shiftEnd, setShiftEnd,
    breakEnd, setBreakEnd,
    breakStart, setBreakStart,
    breakStatus, setBreakStatus,
    date, setDate
}) => {
    const addnewShift = async (token,
        setOpen,
        workerName, date,
        shiftStart, shiftEnd,
        breakStart, breakEnd, breakStatus) => {
        const res = await fetch(api + "/rosters/", {
            method: "POST",
            body: JSON.stringify(
                {
                    worker: workerName,
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
    const createshiftModal = (
        token,
        workerlist, setOpen,
        workerName, setWorkerName,
        shiftStart, setShiftStart,
        shiftEnd, setShiftEnd,
        breakEnd, setBreakEnd,
        breakStart, setBreakStart,
        breakStatus, setBreakStatus,
        date, setDate) => (
        <div className='bg-black w-100 bg-opacity-75 pt-5' style={{ height: "120vh", position: "absolute", top: "0", zIndex: 1 }}>
            <div className="bg-white mx-auto p-5" id='modal-box'>
                <form
                    className="p-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        addnewShift(
                            token,
                            setOpen,
                            workerName, date,
                            shiftStart, shiftEnd,
                            breakStart, breakEnd, breakStatus
                        );
                    }}
                >
                    <h5 > Add Shift</h5>
                    <hr />
                    <div className="mb-3">
                        <label htmlFor="workername" className="form-label"> worker name:</label>
                        <select value={workerName} aria-label='workername' className="mx-1" onChange={(e) => setWorkerName(e.target.value)}>
                            <option value="-">-Select-</option>
                            {
                                workerlist.map((name, index) => (
                                    <option value={name._id} key={index}>{name.firstName}{" "}{name.lastName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">
                            Select Date
                        </label>
                        <input
                            required
                            id='date'
                            aria-label='date'
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
                                type="time"
                                aria-label='shiftStart'
                                value={shiftStart}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setShiftStart(e.target.value);
                                }}
                            />
                        </div>
                        <div className="d-flex flex-column " style={{ marginRight: "20px" }}>
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
                        <label htmlFor="breakStatus" className="form-label">
                            Break:
                        </label>
                        <select value={breakStatus} aria-label='breakStatus' className="mx-1" onChange={(e) => setBreakStatus(e.target.value)}>
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
                                aria-label='breakStart'
                                className="form-control"
                                type="time"
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
                                aria-label='breakEnd'
                                className="form-control"
                                type="time"
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
                                setWorkerName()
                                setDate()
                                setShiftStart()
                                setShiftEnd()
                                setBreakStart()
                                setBreakEnd()
                                setBreakStatus(false)
                                setOpen(false)
                            }}
                        >
                            Close
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
            {createshiftModal(token, workerlist, setOpen,
                workerName, setWorkerName,
                shiftStart, setShiftStart,
                shiftEnd, setShiftEnd,
                breakEnd, setBreakEnd,
                breakStart, setBreakStart,
                breakStatus, setBreakStatus,
                date, setDate)}
        </>)
}
export default RosterCreate