import { Routes, Route } from "react-router-dom";
import Login from "./login/login";
import Welcome from "./landpage/welcome";
import { useNavigate } from "react-router-dom";
import Workers from "./Workers/Workers";
import Worker from "./Workers/Worker";
import Clients from "./Clients/Clients";
import Client from "./Clients/Client";
import CreateNotes from './createnotes/createNotes';
import CaseNoteApproval from "./CaseNoteApproval/casenoteapproval";
import WorkerDashboard from "./WorkerDashboard/WorkerDashboard";
import Roster from "./rosters/Roster";
import allcontext from "./context";
import WorkerRoster from "./rosters/WorkerRoster"; 
import WorkerClientView from "./Clients/WorkerClientView";
import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState('')
  const [users, setUsers] = useState('')
  useEffect(()=>{
    if(window.localStorage.getItem('user')){
      setToken(JSON.parse(window.localStorage.getItem('user')).token)
      setUsers(JSON.parse(window.localStorage.getItem('user')))
    }
  },[])
  return (
    <allcontext.Provider value={[users,setUsers,token,setToken]}>
      <Routes>
        <Route path="/" element={<Login navigate={navigate}  setUsers={setUsers} setToken={setToken} />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/workers" element={<Workers token={token} />} />
        <Route path="/workers/:id" element={<Worker token={token} />} />
        <Route path="/clients" element={<Clients token={token} />} />
        <Route path="/worker-client-view" element={<WorkerClientView token={token} />} />
        <Route path="/clients/:id" element={<Client token={token}/>} />
        <Route path="/create-notes" element={<CreateNotes token={token} user={users} />} />
        <Route path="/case-note-approval" element={<CaseNoteApproval token={token} />} />
        <Route path="/worker-dashboard" element={<WorkerDashboard />} />
        <Route path="/rosters" element={<Roster token={token} />} />
        <Route path="/worker-rosters" element={<WorkerRoster token={token} />} />
      </Routes>
    </allcontext.Provider>
  )
}

export default App;
