import React from "react";
import { api } from "../api";
const Create = (
  {token,
    firstName,
    lastName,
    phonenumber,
    address,
    setAddress,
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
    address,
    setOpen,
  ) => {
    // post data
    const res = await fetch(api + "/clients/", {
      method: "POST",
      body: JSON.stringify(
        {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phonenumber,
          address: address
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
    firstName, lastName,
    phonenumber,
    address,
    setAddress,
    setFirstName,
    setLastName,
    setPhonenumber,
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
              address,
              setOpen,
            );

          }}
        >
          <h5 aria-label="Add Client">
            Add Client
          </h5>
          <hr />
          <div className="mb-3">
            <label htmlFor="fisrtname" className="form-label">
              first name
            </label>
            <input
              type="firstname"
              className="form-control"
              id="fisrtname"
              value={firstName}
              aria-describedby="firstname"
              onChange={(e) => {
                e.preventDefault()
                setFirstName(e.target.value)
              }}
            required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              last name
            </label>
            <input
              required
              type="lastName"
              id="lastName"
              aria-describedby="lastName"
              value={lastName}
              onChange={(e) => {
                e.preventDefault();
                setLastName(e.target.value);
              }}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone number" className="form-label">
              phone number
            </label>
            <input required
              className="form-control"
              id="phone number"
              aria-describedby="phone number"
              value={phonenumber}
              onChange={(e) => {
                e.preventDefault();
                setPhonenumber(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              address
            </label>
            <input required
              className="form-control"
              id="address"
              aria-describedby="address"
              value={address}
              onChange={(e) => {
                e.preventDefault();
                setAddress(e.target.value);
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
                setAddress();
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
        firstName, lastName,
        phonenumber,
        address,
        setAddress,
        setFirstName,
        setLastName,
        setPhonenumber,
        setOpen)}
    </>
  );
};
export default Create;
