import React from 'react'
import { api } from "../api";

const WorkerUpdate = ({ token,id,setFirstName,
  setLastName,
  firstName,
  lastName, email, phonenumber, setEmail, setPhonenumber, setOpen }) => {
  const updateClient = async (token, setOpen,
    firstName,
    lastName, email, phonenumber,id) => {

    // update service
    const res = await fetch(api + "/users/" + id, {
      method: "PUT",
      body: JSON.stringify(
        {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phonenumber,
          email: email
        }
      ),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    window.location.reload()
    //close modal
    setOpen(false)
  };
  const updateModal = (token,id, setFirstName,
    setLastName,
    firstName,
    lastName, email, phonenumber, setEmail, setPhonenumber, setOpen) => (
    <div className='bg-black w-100 h-100 bg-opacity-75 pt-5' style={{ position: "absolute", top: "0", zIndex: 1 }}>
      <div className="bg-white w-50 mx-auto p-5">
        <form
          className="p-5"
          onSubmit={(e) => {
            e.preventDefault();
            updateClient(token, setOpen,
              firstName,
              lastName, email, phonenumber,id);
          }}
        >
          <h5 aria-label="Update Worker">
            Update Worker
          </h5>
          <hr />
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">
              first name
            </label>
            <input
            id='firstname'
            aria-describedby='firstname'
              value={firstName}
              onChange={(e) => {
                e.preventDefault();
                setFirstName(e.target.value);
              }}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              last name
            </label>
            <input
              value={lastName}
              id='lastname'
              aria-label='lastname'
              onChange={(e) => {
                e.preventDefault();
                setLastName(e.target.value);
              }}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone_number" className="form-label">
              phone number
            </label>
            <input
            id='phone_number'
            aria-label='phone_number'
              value={phonenumber}
              onChange={(e) => {
                e.preventDefault();
                setPhonenumber(e.target.value);
              }}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              email
            </label>
            <input
            aria-label='email'
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
              type="button"
              className="btn btn-secondary"
              onClick={e => {
                e.preventDefault()
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
  );
  return (
    <>
      {updateModal(token,id, setFirstName,
        setLastName,
        firstName,
        lastName, email, phonenumber, setEmail, setPhonenumber, setOpen)}
    </>)
}
export default WorkerUpdate