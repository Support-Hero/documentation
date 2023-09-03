import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Body from '../components/body/Body';
import allcontext from "../context";


const authcheck = async () => {
  return true;
};

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const users = useContext(allcontext)[0];
  const username = users ? `${users.firstName} ${users.lastName}` : 'Guest';

  const workerLists = [
    {
      imsrc: "bi-person-vcard",
      bgcolor: "success",
      title: "Clients",
      description: "Client Information",
      route: "/worker-client-view"
    },
    {
      imsrc: "bi-file-earmark-medical",
      bgcolor: "secondary",
      title: "Roster",
      description: "Check Rosters",
      route: "/worker-rosters"
    },
    {
      imsrc: "bi-microsoft-teams",
      bgcolor: "danger",
      title: "Create Note",
      description: "Create a Progress Note",
      route: "/create-notes"
    }
  ];

  useEffect(() => {
    authcheck().then((isAuthenticated) => {
      if (!isAuthenticated) {
        navigate('/');
      }
    });
  }, [navigate]);

  const handleDivClick = (route) => {
    navigate(route);
  };

  const bodyContent = (
    <>
    <div className="container" style={{ maxWidth: '1200px' }}>
      <div className="text-start mx-auto mt-5">
        <label className="fs-3">
          Welcome, 
          <label className="text-primary fw-light" style={{ paddingLeft: "10px" }}>
            {username}
          </label>
        </label>
        <hr />
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ paddingBottom: "100px" }}
          >
            {workerLists.map((list, index) => (
              <div
                className={`clickable-div w-100 mt-3 border border-${list.bgcolor}`}
                style={{ width: '100%' }} 
                key={index}
                onClick={() => handleDivClick(list.route)}
              >
                <div
                  className={`d-flex justify-content-between p-2 bg-${list.bgcolor} bg-opacity-75`}
                >
                  <i className={`bi ${list.imsrc} text-white fs-1`}></i>
                  <label className="fs-2 text-white">{list.title}</label>
                </div>
                <div className="p-2 bg-secondary bg-opacity-25">{list.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  
  return <Body body={bodyContent} />;
};

export default WorkerDashboard;


