import React from "react";
import { api } from "../api";
const WorkerCreate = (
  {token,
    firstName,
    lastName,
    phonenumber,
    email,
    setEmail,
    setFirstName,
    setLastName,
    setPhonenumber,
    setOpen }
) => {

  // create client api fetch
  const addnewClient = async (
    token,
    firstName,
    lastName,
    phonenumber,
    email,
    setOpen,
  ) => {
    // post data
    const res = await fetch(api + "/users/", {
      method: "POST",
      body: JSON.stringify(
        {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phonenumber,
          email: email,
          password: '12345678',
          isManager: false
        }
      ),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    window.location.reload()
    // reset all input
    setOpen(false)
  };

  const addM = (
    token,
    email,
    phonenumber,
    firstName,
    lastName,
    setEmail,
    setPhonenumber,
    setFirstName,
    setLastName,
    setOpen) => (
    <div className='bg-black w-100 h-100 bg-opacity-75 pt-5' style={{ position: "absolute", top: "0", zIndex: 1 }}>
      <div className="bg-white w-50 mx-auto p-5">
        <form
          className="p-5"
          onSubmit={(e) => {
            e.preventDefault();
            addnewClient(
              token,
              firstName,
              lastName,
              phonenumber,
              email,
              setOpen,
            );

          }}
        >
          <h5 aria-label="Add Worker">
            Add Worker
          </h5>
          <hr />
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">
              first name
            </label>
            <input
              type="firstname"
              className="form-control"
              id="firstname"
              aria-describedby="firstname"
              value={firstName}
              onChange={(e) => {
                e.preventDefault()
                setFirstName(e.target.value)
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              last name
            </label>
            <input
              required
              value={lastName}
              id="lastname"
              aria-describedby="lastname"
              onChange={(e) => {
                e.preventDefault();
                setLastName(e.target.value);
              }}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phonenumber" className="form-label">
              phone number
            </label>
            <input
              required
              id="phonenumber"
              aria-describedby="phonenumber"
              className="form-control"
              value={phonenumber}
              onChange={(e) => {
                e.preventDefault();
                setPhonenumber(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              email
            </label>
            <input
              type="email"
              required
              id="email"
              aria-describedby="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="d-flex justify-content-md-between">
            <button
              className="btn btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                setFirstName();
                setLastName();
                setEmail();
                setPhonenumber();
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
      {addM(
        token,
        email,
        phonenumber,
        firstName,
        lastName,
        setEmail,
        setPhonenumber,
        setFirstName,
        setLastName,
        setOpen)}
    </>
  );
};
export default WorkerCreate;
