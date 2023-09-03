import React, { useEffect, useState } from "react";
import Pagination, { clientSlicer } from "../components/pagination";
import RosterCreate from "../modals/RosterCreate";
import { getDateList } from "../components/getdates";
import Body from "../components/body/Body";
import RosterUpdate from "../modals/rosterUpdate";
import { managerAuthcheck } from "../utilities/manager_authcheck";
import { api } from '../api'
import Spinner from "../components/spinner";

const Roster = ({ token }) => {
    const twoweeksdays = getDateList()
    // console.log('weeks',twoweeksdays)
    const currentdays = twoweeksdays.slice(0, 7)
    const [weekdays, setWeekdays] = useState(currentdays);
    // states to create new shift
    // all states: workerName, date, shiftStart, shiftEnd, breakStart, breakEnd
    const [date, setDate] = useState()
    const [workerName, setWorkerName] = useState()
    const [shiftStart, setShiftStart] = useState()
    const [shiftEnd, setShiftEnd] = useState()
    const [breakStart, setBreakStart] = useState()
    const [breakEnd, setBreakEnd] = useState()
    const [breakStatus, setBreakStatus] = useState(false)

    // setup worker list for choose to arrange shift
    const [workerlist, setWorkerlist] = useState([])

    const [createOpen, setCreateOpen] = useState(false)
    const [updateOpen, setUpdateOpen] = useState(false)

    // slice all the roster data :step1
    const [dummyclients, setDummyclients] = useState()

    // page default be [1], then fetch clients data and update pages :step2
    const [clientPage, setClientPage] = useState([1]);
    const pages = (dummyclients) => {
        const n = [];
        for (let i = 1; i <= dummyclients.length; i++) {
            n.push(i);
        }
        setClientPage(n);
    };
    // set current page for retriving data :step3
    const [currentPage, setCurrentPage] = useState(1);

    // fake data , set dummyclients[0] when page loaded, then change when currentPage changes :step4
    const [rostersEachPage, setRostersEachPage] = useState();

    const [id, setId] = useState()
    // click button 
    const generateNextWeek = (e) => {
        e.preventDefault()

        setWeekdays(
            twoweeksdays.slice(7, 14)
        )
        setValue(2)
    };
    const fetchRosters = async () => {
        try {
            const res = await fetch(api + "/rosters/", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            // set page sliced clients
            setDummyclients(clientSlicer(data));
            // set first page clients
            setRostersEachPage(clientSlicer(data)[0]);
            // set pages
            pages(clientSlicer(data));
        } catch (error) {
            console.error("Error:", error);
        }
    }
    const fetchworkers = async () => {
        // fetch data
        try {

            const res = await fetch(api + "/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            // set page sliced clients
            setWorkerlist(data);

        } catch (error) {
            console.error("Error:", "need login");
        }
    };
    const [value, setValue] = useState(-1)
    managerAuthcheck()
    useEffect(() => {
        token && fetchRosters()
        token && fetchworkers()
    }, [token])
    const body = (
        <>

            {createOpen && <RosterCreate
                token={token}
                workerlist={workerlist}
                setOpen={setCreateOpen}
                workerName={workerName} setWorkerName={setWorkerName}
                shiftStart={shiftStart} setShiftStart={setShiftStart}
                shiftEnd={shiftEnd} setShiftEnd={setShiftEnd}
                breakEnd={breakEnd} setBreakEnd={setBreakEnd}
                breakStart={breakStart} setBreakStart={setBreakStart}
                breakStatus={breakStatus} setBreakStatus={setBreakStatus}
                date={date} setDate={setDate}
            />}
            {updateOpen && <RosterUpdate
                token={token}
                setOpen={setUpdateOpen}
                workerName={workerName} setWorkerName={setWorkerName}
                shiftStart={shiftStart} setShiftStart={setShiftStart}
                shiftEnd={shiftEnd} setShiftEnd={setShiftEnd}
                breakEnd={breakEnd} setBreakEnd={setBreakEnd}
                breakStart={breakStart} setBreakStart={setBreakStart}
                breakStatus={breakStatus} setBreakStatus={setBreakStatus}
                date={date} setDate={setDate} id={id}
            />}

            <div className="w-75 text-start mx-auto mt-5" style={{ marginBottom: "100px" }}>
                <div id="second_nav_out" className="d-flex justify-content-between ">
                    <label className="fs-3">Rosters</label>
                </div>
                <hr />
                <div className="d-flex justify-content-end" >

                    <button className="btn" onClick={(e) => {
                        e.preventDefault()
                        setWeekdays(currentdays)
                        setValue(1)
                    }} style={{ color: value === 1 ? "red" : "" }}>current</button>
                    <button className="btn" onClick={generateNextWeek}
                        style={{ color: value === 2 ? "red" : "" }}
                    >next week</button>
                </div>

                <Pagination
                    dummyclients={dummyclients}
                    clientPage={clientPage}
                    setClientsEachPage={setRostersEachPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                {rostersEachPage ?
                    <div style={{ overflow: "auto", height: "80vh", borderStyle: "solid", borderColor: "lightgray" }} >

                        <table className="table table-bordered p-0" style={{ minWidth: "800px" }} >
                            <thead >
                                <tr style={{ position: "sticky", top: "0" }}>
                                    <th style={{ position: "sticky", top: "0", left: "0" }}>Date</th>
                                    {
                                        weekdays.map((day, index) => (
                                            <th scope="col" key={index}>{day.slice(5,)}</th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {rostersEachPage.map((roste, index) => (
                                    <tr key={index}>
                                        <th style={{ position: "sticky", top: "0", left: "0" }}>{roste.worker.firstName}</th>
                                        {weekdays.map((day, index1) => (

                                            roste.shifts.some(x=>x.date.slice(0, 10) === weekdays[index1]) ?
                                                < td key={index1} >
                                                    {
                                                        roste.shifts.map((x, ind) => (
                                                            <div className="d-flex flex-column" key={ind}
                                                                onClick={() => x.date.slice(0, 10) === weekdays[index1] ?
                                                                    (setWorkerName(roste.worker.firstName + roste.worker.lastName),
                                                                        setDate(x.date.slice(0, 10)),
                                                                        setBreakStatus(x.break),
                                                                        setBreakStart(x.breakStart),
                                                                        setBreakEnd(x.breakEnd),
                                                                        setShiftEnd(x.shiftEnd),
                                                                        setShiftStart(x.shiftStart),
                                                                        setId(x._id),
                                                                        setUpdateOpen(true)
                                                                    )
                                                                    :
                                                                    ""}
                                                            >
                                                                <label style={{ fontSize: "12px" }}>
                                                                    {x.date.slice(0, 10) === weekdays[index1] ? x.shiftStart + " - " + x.shiftEnd : ""}
                                                                </label>
                                                                <label>
                                                                    {x.date.slice(0, 10) === weekdays[index1] && x.break ?
                                                                        (<label className="bg-primary text-white p-1" style={{ fontSize: "12px" }}>
                                                                            <i className="bi bi-cup-fill p-1"></i>
                                                                            break: {x.breakStart.split(' ')[0]} - {x.breakEnd}
                                                                        </label>)
                                                                        : ""
                                                                    }
                                                                </label>

                                                            </div>))}
                                                </td> :
                                                <td key={index1} onClick={() => setCreateOpen(true)} >
                                                </td>
                                        ))
                                        }

                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                    : (
                        <Spinner />
                    )}
            </div>
        </>
    )
    return (
        <Body body={body} />

    );
};
export default Roster;