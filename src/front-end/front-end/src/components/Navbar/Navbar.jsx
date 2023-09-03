import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import allcontext from "../../context";

const Navbar = () => {
  const users = useContext(allcontext)[0]
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/"); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ position: "inherit" }}>
      <div className="container-fluid ">
        <div className="navbar-brand">
          Support Hero
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {
          users ? (
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {users.isManager ?
                /* manager platform nav */
                <>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link
                        to="/welcome"
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item dropdown">
                      <Link
                        to="/"
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        All
                      </Link>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li>
                          <Link to="/workers" className="dropdown-item" href="#">
                            Workers
                          </Link>
                        </li>
                        <li>
                          <Link to="/clients" className="dropdown-item" href="#">
                            Clients
                          </Link>
                        </li>
                        <li>
                          <Link to="/rosters" className="dropdown-item" href="#">
                            Rosters
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <Link to="/case-note-approval" className="dropdown-item" href="#">
                            Notes
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </> : (
                  /* worker platform nav */
                  <>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <Link
                          to="/worker-dashboard"
                          className="nav-link active"
                          aria-current="page"
                          href="#"
                        >
                          Team Home
                        </Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link
                          to="/"
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="navbarDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          All
                        </Link>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <li>
                            <Link to="/worker-client-view" className="dropdown-item" href="#">
                              Clients
                            </Link>
                          </li>
                          <li>
                            <Link to="/worker-rosters" className="dropdown-item" href="#">
                              Rosters
                            </Link>
                          </li>
                          <li>
                            <Link to="/create-notes" className="dropdown-item" href="#">
                              Notes
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </>)}
              <ul className="d-flex navbar-nav">
                <li className="nav-item">
                  <button
                    className="btn btn-link"
                    onClick={handleLogout} 
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>


          )
            : (
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className=" me-auto">
                </div>
                <ul className="d-flex navbar-nav">


                  <li className="nav-item">
                    <Link
                      to="/"
                      className="nav-link active"
                      aria-current="page"
                      href="#"
                    >
                      Sign in
                    </Link>
                  </li> </ul>
              </div>)

        }
      </div>
    </nav>
  );
};
export default Navbar;
