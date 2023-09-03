import React, { useState, useEffect } from 'react';
import { UNSAFE_RouteContext, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './createNotes.css';
import Navbar from '../components/Navbar/Navbar';
import { api } from '../api'

// define CreateNotes component
const CreateNotes = ({ token, user }) => {  // Added token as a prop
  const [formData, setFormData] = useState({
    date: new Date(),
    client: '',
    goals: '',
    presentation: '',
    action: '',
    outcome: '',
    followUp: ''
  });

const [clients, setClients] = useState([]);
const [author, setAuthor] = useState(null);

const [showModal, setShowModal] = useState(false);
const [showErrorModal, setShowErrorModal] = useState(false);
const [errorBoxMessage, setErrorBoxMessage] = useState('');
const [showConfirmation, setShowConfirmation] = useState(false);

useEffect(() => {
 
  fetch(api + '/clients', {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then(response => response.json())
  .then(data => setClients(data))
  .catch(error => console.error('Error fetching clients:', error));

}, [token]);


// destructure formData state
  const { date, client, goals, presentation, action, outcome, followUp } = formData;


  const navigate = useNavigate();

  // function to trigger the showModal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

// function for data changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // function for date changes with the DatePicker import
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date
    });
  };

  // closes the error modal and clears the error message string
  const closeErrorModal = () => {
    setShowErrorModal(false);
    setErrorBoxMessage(''); 
  };

  // checks that each field has been entered by mapping over each key and checking that it has a value
  const checkMissingFields = () => {
    const missingFields = Object.keys(formData).filter((key) => !formData[key]);
    if (missingFields.length > 0) {
      setErrorBoxMessage(`You're missing some information sections - ${missingFields.join(", ")}`);
      setShowErrorModal(true);
      return false;
    }
    return true;
  };
  
// submit form function - date is always set to todays date by default so might need to change that
const handleSubmit = (e) => {
    e.preventDefault();
    if (checkMissingFields()) {
      setErrorBoxMessage('');
      setShowModal(true);
    }
  };

  // handles the confirmation submission of the form and redirects to the /welcome after a second
  const finalSubmit = () => {

    const preparedData = {
      date: formData.date,
      goals: formData.goals,
      presentation: formData.presentation,
      actions: formData.action,
      outcome: formData.outcome,
      followUp: formData.followUp === 'true', 
      isMgrAuthorised: false,  
      author: { _id:  user._id},  
      client: { _id: formData.client },  
    };
  
    const jsonData = JSON.stringify(preparedData);
  
    fetch(api + '/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: jsonData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setShowConfirmation(true);
      setTimeout(() => {
        navigate('/welcome');
      }, 500);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  
    toggleModal();
  };
  

  return (
    <>
      <Navbar />
      <div>
        {errorBoxMessage && <div className="errorBox">{errorBoxMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Date: </label>
            <DatePicker selected={date} onChange={handleDateChange} />
          </div>
          <div>
            <label>Client: </label>
            <select name="client" value={client} onChange={handleChange}>
            <option value="" disabled>Select client</option>
            {clients.map((clientObj, index) => (
              <option key={index} value={clientObj._id}>{clientObj.firstName} {clientObj.lastName}</option>
            ))}
          </select>
          </div>
          <div>
            <label>Goals: </label>
            <textarea name="goals" value={goals} onChange={handleChange} placeholder='Enter Goals for the shift'></textarea>
          </div>
          <div>
            <label>Presentation: </label>
            <textarea name="presentation" value={presentation} onChange={handleChange}  placeholder="Describe how Client's mood and make notes of physical appearance or any concerns."></textarea>
          </div>
          <div>
            <label>Action: </label>
            <textarea name="action" value={action} onChange={handleChange} placeholder='Describe what happened throughout the shift, tasks completed with Client, concerning behaviours, if you travelled anywhere.'></textarea>
          </div>
          <div>
            <label>Outcome: </label>
            <textarea name="outcome" value={outcome} onChange={handleChange} placeholder='Describe if the goals of the shift were met and if not what was not achieved.'></textarea>
          </div>
          <div>
            <label>Follow-up: </label>
            <textarea name="followUp" value={followUp} onChange={handleChange} placeholder='Did any behaviour or issues need to be escalated during support, if so who did you contact briefly describe what was said.'></textarea>
          </div>
          <button type="submit">Preview Submission</button>
        </form>

        {showErrorModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Error</h2>
            <p>{errorBoxMessage}</p>
            <div className="modal-buttons">
              <button onClick={closeErrorModal}>Okay</button>
            </div>
          </div>
        </div>
      )}

        {showModal && (
  <div className="modal">
    <div className="modal-content">
      <h2>Confirm Submission</h2>
      <p><strong>Date:</strong> {formData.date.toString()}</p>
      <p><strong>Client:</strong> {formData.client}</p>
      <p><strong>Goals:</strong> {formData.goals}</p>
      <p><strong>Presentation:</strong> {formData.presentation}</p>
      <p><strong>Action:</strong> {formData.action}</p>
      <p><strong>Outcome:</strong> {formData.outcome}</p>
      <p><strong>Follow-up:</strong> {formData.followUp}</p>
      <div className='modal-buttons'>
        <button onClick={finalSubmit}>Submit</button>
        <button onClick={toggleModal}>Edit</button>
        <button onClick={toggleModal}>Cancel</button>
      </div>
    </div>
  </div>
)}


        {showConfirmation && (
          <div className="modal">
            <div className="modal-content">
              <h2>Submission Confirmed</h2>
              <p>Returning to Dashboard</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateNotes;
