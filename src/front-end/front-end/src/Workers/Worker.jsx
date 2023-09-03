import React, { useEffect, useState } from "react";
import { api } from "../api";
import { useParams } from "react-router-dom";
import Spinner from '../components/spinner'
import Body from "../components/body/Body";

const Worker = ({ token }) => {
  const { id } = useParams();
  const [worker, setWorker] = useState();
  const fetchWorker = async (id) => {
    // fetch data
    try {
      const res = await fetch(api + "/users/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // set Client
      setWorker(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchWorker(id);
  }, [token]);
  const body = (
    <>
      {worker ? (
        <div className="w-75 text-start mx-auto mt-5">
          <label className="fs-3">Workers</label>
          <hr />
          <div className="container">
            <div className="row fs-3">Detail</div>
            <div className="row  py-3">
              <div class="col-2">Name :</div>
              <div class="col-2">
                {worker.firstName} {worker.lastName}
              </div>
              <div class="col-3">contact number :</div>
              <div class="col-2">{worker.phoneNumber}</div>
            </div>
            <div className="row border-bottom py-3">
              <div class="col-2">address :</div>
              <div class="col-2">{worker.email}</div>
            </div>
            <div className="row border-bottom fs-3 py-3 align-items-center" id="workers_clients">
              Clients :
              <div class="col fs-6">
                <button>view all</button>
              </div>
            </div>
            <div className="row border-bottom py-3">
              <div className="d-flex flex-column">
                {worker.clients?.map((client, index) => (
                  <div>
                    <p className="text-success"> name: {client.firstName} {client.lastName}</p>
                    <p>
                      <label className="text-secondary">address:</label>{" "}
                      {client.address}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  )
  return (
    <Body body={body} />
  );
};
export default Worker;
