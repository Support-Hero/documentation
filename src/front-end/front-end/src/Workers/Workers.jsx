import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import "../Clients/Client.css"
import Pagination, { clientSlicer } from "../components/pagination";
import Spinner from "../components/spinner";
import Delete from "../modals/Delete";
import WorkerCreate from "../modals/WorkerCreate"
import WorkerUpdate from "../modals/WorkerUpdate";
import Body from "../components/body/Body";
import { managerAuthcheck } from "../utilities/manager_authcheck";
import { HashLink } from 'react-router-hash-link';
const Workers = ({ token }) => {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [updateOpen, setUpdatepen] = useState(false)
  const [client, setClient] = useState();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phonenumber, setPhonenumber] = useState();
  const [email, setEmail] = useState();
  const [id, setId] = useState()
  // after fetch workers data, replace dummyclient
  // initiate all grouped workers
  const [dummyworkers, setDummyworkers] = useState();
  // initiate first page workers( first group)
  const [workersEachPage, setWorkersEachPage] = useState();
  //current page number
  const [currentPage, setCurrentPage] = useState(1);
  // page default be [1], then fetch clients data and setPage
  // all page list for pagination
  const [clientPage, setClientPage] = useState([1]);


  managerAuthcheck()
  const pages = (dummyclients) => {
    const n = [];
    for (let i = 1; i <= dummyclients.length; i++) {
      n.push(i);
    }
    setClientPage(n);
  };

  const fetchworkers = async () => {
    // fetch data
    try {

      const res = await fetch(api + "/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // set page sliced clients
      setDummyworkers(clientSlicer(data));
      // set first page clients
      setWorkersEachPage(clientSlicer(data)[0]);
      // set pages
      pages(clientSlicer(data));
      
    } catch (error) {
      console.error("Error:", "need login");
    }
  };
  useEffect(() => {
      fetchworkers()
  }, [token])
  const body = (
    <>
      {createOpen &&
        <WorkerCreate
        token={token}
          setEmail={setEmail} 
          setFirstName={setFirstName}
          setLastName={setLastName}
          setPhonenumber={setPhonenumber}
          firstName={firstName}
          lastName={lastName}
          phonenumber={phonenumber}
          email={email}
          setOpen={setCreateOpen}
        />}
      {deleteOpen && <Delete token={token} routeName="/users/" client={client} setOpen={setDeleteOpen} />}
      {updateOpen && <WorkerUpdate token={token} id={id} setFirstName={setFirstName}
        setLastName={setLastName}
        email={email}
        phonenumber={phonenumber}
        firstName={firstName}
        lastName={lastName} setEmail={setEmail} setPhonenumber={setPhonenumber} setOpen={setUpdatepen} />}

      <div className="w-75  mx-auto mt-5" style={{ marginBottom: "100px" }}>
        <div id="second_nav_out">
          <label className="fs-3">Workers</label>
          <form
            className="d-flex p-0 m-0"
          >
            <input
              className="form-control mr-1"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <select className="mx-1">
              <option value="-">-Select-</option>
              <option value="name">name</option>
              <option value="phone_number">email</option>
            </select>
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <button
            className="btn btn-primary "
            onClick={(e) => {
              e.preventDefault();
              setCreateOpen(true)
            }}
          >
            + Add New Workers
          </button>
        </div>
        <hr />

        {workersEachPage ? (
          <div className="table-responsive border">
            <table className="table ">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Clients</th>
                  <th scope="col">Notes</th>
                </tr>
              </thead>
              <tbody>
                {workersEachPage.map((worker, index) => (
                  <tr key={index}>
                    <td><Link to={`/workers/${worker._id}`}>{worker.firstName} {worker.lastName}</Link></td>
                    <td>{worker.email}</td>
                    <td>{worker.phoneNumber}</td>
                    <td><HashLink to={`/workers/${worker._id}#workers_clients`}>View</HashLink></td>
                    <td><button
                      className="btn btn-outline-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        setId(worker._id);
                        setFirstName(worker.firstName)
                        setLastName(worker.lastName)
                        setPhonenumber(worker.phoneNumber)
                        setEmail(worker.email)
                        setUpdatepen(true)
                      }}
                    >
                      Update
                    </button></td>
                    <td><button
                      className="btn btn-outline-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        setDeleteOpen(true)
                        setClient(worker);
                      }}
                    >
                      x
                    </button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination dummyclients={dummyworkers} clientPage={clientPage} setClientsEachPage={setWorkersEachPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  )

  return (
    <Body body={body} />
  );
};
export default Workers;
