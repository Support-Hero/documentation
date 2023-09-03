import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/spinner";
import Body from "../components/body/Body";
import Pagination, { clientSlicer } from "../components/pagination";
import { HashLink } from 'react-router-hash-link';
import { api } from "../api";

const WorkerClientView = ({ token }) => {
  const [dummyclients, setDummyclients] = useState();
  const [clientsEachPage, setClientsEachPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [clientPage, setClientPage] = useState([1]);

  const pages = (dummyclients) => {
    const n = [];
    for (let i = 1; i <= dummyclients.length; i++) {
      n.push(i);
    }
    setClientPage(n);
  };

  const fetchClients = async () => {
    try {
      const res = await fetch(api + "/clients/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDummyclients(clientSlicer(data));
      setClientsEachPage(clientSlicer(data)[0]);
      pages(clientSlicer(data));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [token]);

  const body = (
    <>
      <div className="w-75 mx-auto mt-5" style={{ marginBottom: "100px" }}>
        <div id="second_nav_out">
          <label className="fs-3">Clients</label>
        </div>
        <hr />
        {
          clientsEachPage ? (
            <div className="mx-auto border table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Worker</th>
                    <th scope="col">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {clientsEachPage.map((client, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={`/clients/${client._id}`}>
                          {client.firstName}
                        </Link>
                      </td>
                      <td>{client.address}</td>
                      <td>{client.phoneNumber}</td>
                      <td>
                        <HashLink to={`/clients/${client._id}#workers_view`}>View</HashLink>
                      </td>
                      <td>
                        <HashLink to={`/clients/${client._id}#notes_view`}>Notes</HashLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                dummyclients={dummyclients}
                clientPage={clientPage}
                setClientsEachPage={setClientsEachPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          ) : (
            <Spinner />
          )
        }
      </div>
    </>
  );

  return (
    <Body body={body} />
  );
};

export default WorkerClientView;
