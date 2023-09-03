import React, { useContext } from "react";
import Body from '../components/body/Body'
import '../components/Sidebar/sidebar.css'
import { managerAuthcheck } from "../utilities/manager_authcheck";
import allcontext from "../context";
import { Link } from "react-router-dom";
export const lists = [
  {
    imsrc: "bi-people",
    bgcolor: "primary ",
    title: "workers",
    description: "worker information, crud",
    endpoint: "workers"
  },
  {
    imsrc: "bi-person-vcard",
    bgcolor: "success ",
    title: "clients",
    description: "worker information, crud",
    endpoint: "clients"
  },
  {
    imsrc: "bi-file-earmark-medical",
    bgcolor: "secondary ",
    title: "rosters",
    description: "worker information, crud",
    endpoint: "rosters"
  },
  {
    imsrc: "bi-microsoft-teams",
    bgcolor: "danger",
    title: "notes",
    description: "worker information, crud",
    endpoint: "case-note-approval"
  },

];
const Welcome = () => {
  const users = useContext(allcontext)[0]
  const username = users.firstName+' '+users.lastName
  const clientsProgress = [
    { clientname: "emma li", color: "success", process: "44%" },
    { clientname: "misla s", color: "danger", process: "26%" },
    { clientname: "sade ew", color: "secondary", process: "34%" },
    { clientname: "lorai  sa", color: "warning", process: "74%" },
    { clientname: "advr df3", color: "info", process: "54%" },
    { clientname: "masa lo", color: "danger", process: "84%" }
  ]
  managerAuthcheck()
  
  const body = (
    <div className="w-75  mx-auto mt-5" style={{ paddingBottom:"100px" }}>
      <div className="">

        <label className="fs-3">Welcome,<label className="text-primary fw-light" style={{ paddingLeft: "10px" }}>{username}</label> </label>
        <hr />
        <div id='lg_main_bar'>
          <div className="row gx-5 gy-4">
            <div className="col-4 ">
              <div className="border shadow rounded p-2">

                Actions
                <div className="text-center">
                  <label className="fs-1 ">Actions</label>
                </div>
              </div>
            </div>
            <div className="col-7 ">
              <div className="p-2 border shadow rounded">
                Notifications
                <div className="text-center">
                  <label className="fs-1 ">Notifications</label>
                </div>
              </div>
            </div>

            <div className="col-6 ">
              <div className="p-2 border shadow rounded">

                Latest Notes
                <ul className="list-group p-4 ">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    A list item
                    <span className="badge bg-primary rounded-pill">1</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    A second list item
                    <span className="badge bg-primary rounded-pill">1</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    A third list item
                    <span className="badge bg-primary rounded-pill">1</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-6 ">
              <div className="p-2 border shadow rounded">

                This week's clients
                <ul className="list-group p-4">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Client 1
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Client 1
                  </li><li className="list-group-item d-flex justify-content-between align-items-center">
                    Client 1
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-10 ">
              <div className="p-2 border shadow rounded">
                Client Care Progress List
                <hr />
                {
                  clientsProgress.map((progres, index) => (
                    <div key={index} className="d-flex w-100 justify-content-between align-items-center px-2">
                      <div className="">{progres.clientname}</div>
                      <div className="progress my-3"style={{width:"90%"}}>
                        <div className={`progress-bar bg-${progres.color}`} style={{ width: progres.process }}></div>
                      </div>
                    </div>
                  ))
                }

              </div>
            </div>
          </div>
        </div>

        <div id='main_bar' style={{ paddingBottom: '100px' }} >
          {lists.map((list, index) => (
            <div
            aria-label="main_page_block"
              className={`w-100  mt-3 border border-${list.bgcolor}`}
              key={index}
            >
              <div
                className={`d-flex justify-content-between align-items-center p-2 bg-${list.bgcolor} bg-opacity-75`}
              >
                <i className={`bi ${list.imsrc} text-white fs-1`}></i>
            <Link to={`/${list.endpoint}`}>  <label className="fs-3 text-white">{list.title}</label></Link>
              </div>
              <div className="p-2 bg-secondary bg-opacity-25">{list.description}</div>
            </div>
          ))}
        </div>
      </div>
      Have a great day!
    </div>
  )
  return (
    <Body body={body} />
  );
};
export default Welcome;
