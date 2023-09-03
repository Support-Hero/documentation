import React, { useState } from "react";
import "./login.css";
import { api } from "../api";
import Navbar from "../components/Navbar/Navbar";
import Bottom from "../components/Bottom/Bottom";
import { LoginNav } from "../utilities/login_nav";
const Login = ({ navigate,setUsers,setToken }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [msg, setMsg] = useState()
  const [manager, setManager] = useState(false)
  const [eye,setEye]=useState(true)
  LoginNav()
  // manager platform signin
  const managerSubmit = async (e) => {
    e.preventDefault()
    try {
      // login service
      const res = await fetch(api + "/login/", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      })
      const data = await res.json()
      if (res.status === 401) {
        setMsg(data.error)
      } else if (!data.isManager) {
        console.log('res',data)
        setMsg('you need to be a manager')
      }else{
        window.localStorage.setItem("user", JSON.stringify(data))
        window.localStorage.setItem("token", data.token)
        setUsers(data)
        setToken(data.token)
        navigate('/welcome')
      }

    } catch (error) {
      console.log("Error:", error);
    }
  };
  // worker platform signin
  const submit = async (e) => {
    e.preventDefault()
    try {
      // login service
      const res = await fetch(api + "/login/", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      })
      const data = await res.json()
      if (res.status === 401) {
        setMsg(data.error)
      } else {
        window.localStorage.setItem("user", JSON.stringify(data))
        window.localStorage.setItem("token", data.token)
        setUsers(data)
        setToken(data.token)
        navigate('/worker-dashboard')
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }
  const body = (
    <div className="container" >
      <div className="d-flex justify-content-center align-items-center" >
        <img
          src="https://media.discordapp.net/attachments/1138692622467211358/1142424320388378674/image.png"
          style={{ width: "50%", objectFit: "contain" }}
          id="logo"
        />
        {
          manager ?
            <form onSubmit={managerSubmit} id="loginbox">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    e.preventDefault()
                    setEmail(e.target.value)
                    setMsg()
                  }}
                required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <p className="d-flex">

                <input
                  value={password}
                  type={`${eye?"":"password"}`}
                  className="form-control"
                  id="exampleInputPassword1"
                  style={{position:"relative"}}
                  onChange={(e) => {
                    e.preventDefault()
                    setPassword(e.target.value)
                    setMsg()
                  }}
                required
                />
                <i className="bi bi-eye-slash" 
                  style={{ zIndex: "999", position: "relative", left: "-50px", top: "5px" }} 
                  onClick={() => setEye(prevEye=>!prevEye)}></i>
                </p>
              </div>
              <div className="mb-3 form-check text-end">
              <input type="checkbox" onClick={() => setManager(false)}/>
                <label className="btn btn-link" >Team member</label>
              </div>
              <div className="d-flex flex-column">

                <label className="text-danger" style={{ visibility: msg ? "visible" : 'hidden', height: "50px" }}>{msg}</label>
                <button type="submit" className="btn btn-success w-50">
                  Manager Sign In
                </button>
              </div>
            </form>
            :
            <form onSubmit={submit} id="loginbox">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    e.preventDefault()
                    setEmail(e.target.value)
                    setMsg()
                  }}
                required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <p className="d-flex">

                <input
                  value={password}
                  type={`${eye?"":"password"}`}
                  className="form-control"
                  style={{position:"relative"}}
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    e.preventDefault()
                    setPassword(e.target.value)
                    setMsg()
                  }}
                required
                  /><i className="bi bi-eye-slash" 
                  style={{ zIndex: "999", position: "relative", left: "-50px", top: "5px" }} 
                  onClick={() => setEye(prevEye=>!prevEye)}></i>
                </p>
              </div>
              <div className="mb-3 form-check text-end">
                <input type="checkbox" onClick={() => setManager(true)} />
                <label className="btn btn-link" >Team manager</label>
              </div>
              <div className="d-flex flex-column">

                <label className="text-danger" style={{ visibility: msg ? "visible" : 'hidden', height: "50px" }}>{msg}</label>
                <button type="submit" className="btn btn-danger w-50">
                  Sign In
                </button>
              </div>
            </form>
        }

      </div>
      <div className="d-flex">
        <img
          id="image1"
          src="/images/login_img1.jpg"
        />
        <img
          id="image2"
          src="/images/login_img2.jpg"
        />
      </div>
    </div>
  );
  return (
    <div style={{ minHeight: "100vh", position: "relative" }} >
      <div >
        <Navbar />
        {body}
      </div>
      <Bottom />
    </div>
  );
};
export default Login;
