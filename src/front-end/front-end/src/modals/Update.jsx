import React from 'react'
import { api } from "../api";

const Update = ({token,id,  setFirstName,
  setLastName,
  phonenumber,
  firstName,
  lastName, address, setAddress, setPhonenumber, setOpen }) => {
  const updateClient =async ( token,setOpen,
    firstName,
    lastName, address, phonenumber,id) => {

    // update client service
    const res = await fetch(api + "/clients/"+id, {
      method: "PUT",
      body: JSON.stringify(
        {firstName:firstName,
          lastName:lastName,
          phoneNumber:phonenumber,
          address:address
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
    address,
    phonenumber,
    firstName,
    lastName, setAddress, setPhonenumber, setOpen) => (
    <div className='bg-black w-100 h-100 bg-opacity-75 pt-5' style={{ position: "absolute", top: "0", zIndex: 1 }}>
      <div className="bg-white w-50 mx-auto p-5">
        <form
          className="p-5"
          onSubmit={(e) => {
            e.preventDefault();
            updateClient( token,setOpen,
              firstName,
              lastName, address, phonenumber, id);
          }}
        >
          <h5 aria-label='Update Client'>
            Update Client
          </h5>
          <hr />
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">
              first name
            </label>
            <input
              value={firstName}
              id='firstname'
              aria-describedby='firstname'
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
              aria-describedby='lastname'
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
              value={phonenumber}
              id='phone_number'
              aria-describedby='phone_number'
              onChange={(e) => {
                e.preventDefault();
                setPhonenumber(e.target.value);
              }}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              address
            </label>
            <input
              className="form-control"
              id='address'
              aria-describedby='address'
              value={address}
              onChange={(e) => {
                e.preventDefault();
                setAddress(e.target.value);
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
      {updateModal( token,id,setFirstName,
    setLastName,
    address,
    phonenumber,
    firstName,
    lastName, setAddress, setPhonenumber, setOpen)}
    </>)
}
export default Update