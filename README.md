# Support Hero
# Term 3 - Assessment 2 - Full Stack Application (Part A)

## [Github](https://github.com/CameronWD/SupportWorkerNoteApp)
## [Slidedeck](ppt/T3A2-A-presentation.pdf)

![SupportHeroLogo](docs/SupportHeroLogo.png)

## Table of Contents
- [Links](#links)
- [R1 - Description of website](#r1-description-of-your-website)
- [R2 - Dataflow Diagram](#r2-dataflow-diagram)
- [R3 - Application Architecture Diagram](#r3-application-architecture-diagram)
- [R4 - User Stories](#r4-user-stories)
- [R5 - Wireframes](#r5-wireframes)
- [R6 - Project Managment](#r6-standups-and-project-managament-with-trello) 

## Links
### Deployed Services

[Front end](https://support-hero.netlify.app/)

[Back end api](https://back-end-6pxz.onrender.com/)


## R1: Description of your website

### Purpose:

The primary purpose of this web application is to streamline and standardise the note-taking process for support workers during their one-on-one sessions with clients. This addresses the problem of inconsistent and often inadequate note-taking practices which result in incomplete client profiles. Such gaps in documentation can affect the quality of client care and add undue workload to team leaders. By ensuring that each interaction with a client is consistently documented in a structured manner, the application aims to enhance the quality of client care, reduce oversight errors, and alleviate the burden on team leaders.

### Functionality / features:
Client Profiles: These profiles contain information about each client, including their care plan, personal details, who their care leader is. Each profile will have an option to view a full history of previous progress notes for that Client.
Structured Note Entry: This feature leads support workers through a structured form when they document a shift after it has completed. This ensures progress note standards for increased readability and better outcomes for Clients. 
Dashboard: When a user is logged in, they have a dashboard where they can select to see upcoming shifts, see if they are missing any notes and a history of their previous notes. Workers can also see a list of the Clients they work with.
User Authentication: Login function to ensure users can only see details they are allowed to. This would also allow for admins to be authenticated so they are able to create Client and Worker profiles. Would include other admin tools like removing users as well. 
Database Tables: Will have separate tables for Clients, Workers, Progress Notes and Rosters to manage the data efficiently. 
Data Encryption: In an effort to maintain confidentiality and ensure privacy of client interactions, all notes and client profiles will be encrypted.

### Target audience:
Organisations or Businesses would use this software as their way to support their employees in tracking their shifts, clients and note taking.
Support Leaders and Administrators would use this software to add new clients and workers, manage their pairings and track progress notes.
Support Workers: This would be the largest section of users who would interact with the system regularly. Used to look up Client information, shift information and submitting their progress notes. 

### Tech stack:
Frontend: React will be used to create an interactive and responsive frontend.
Backend: Node.js and Express.js. Node will allow the application to execute Javascript on the server side and express will be used to create the applications API.
Database: MongoDB - NoSQL database that will store data in a JSON format. 
Authentication: JWT will be used for user authentication. 
Encryption: The application will use bcrypt for hashing passwords and encrypting the data that needs to be hashed for privacy reasons. 

## R2: Dataflow Diagram

![DataflowDiagram](docs/DataflowDiagram.png)
## R3: Application Architecture Diagram

![ApplicationDiagram](docs/NoteTakingApp.jpg)
## R4: User Stories

- <u> User </u>: As a support worker, I want to log in to the application so that I can access and input client notes efficiently.

    <u> Acceptance Criteria </u>: There should be a secure login page with appropriate authentication measures. Upon successful login, the support worker should be directed to their dashboard.


- <u> User </u>: As a support worker, I want to select a client from my list and enter structured notes for them.

    <u> Acceptance Criteria </u>: On the dashboard, there should be a clear list of clients assigned to the support worker. I can select a client from the list and be directed to a note entry form. The note entry form should have fields for essential details such as date, client's mood, challenges faced, interventions used, and future recommendations. The form should guide me through filling out the essential details.

- <u> User </u>:As a support worker, I want to receive reminders to complete client notes before ending my shift.

    <u> Acceptance Criteria </u>: The application should send notifications or reminders to the support worker as their shift is about to end.
Reminders should encourage timely and consistent note-taking.

- <u> User </u>:As a support worker, I want to view a chronological list of all notes for a specific client.

    <u> Acceptance Criteria </u>: When I select a client, I should be able to see a history of all the notes I've entered for that client in a chronological order.
Each note should display key details at a glance to facilitate quick understanding.


- <u> User </u>: As a support worker, I want to easily edit or update previously entered notes.

    <u> Acceptance Criteria </u>:  In the client's note history, I should have the option to edit or update any previously entered notes. Changes should be logged with a timestamp to maintain transparency and accountability.

- <u> User </u>: As a team leader, I want a unified view of all client notes entered by my team for effective oversight.

    <u> Acceptance Criteria </u>: Team leaders should have a separate dashboard that provides an overview of all client notes entered by their team.
The overview should include filters to sort and search for specific clients or notes.


- <u> User </u>: As a team leader, I want to identify inconsistencies or missing information in client notes to ensure comprehensive documentation.

    <u> Acceptance Criteria </u>: The application should have a feature that analyses notes and highlights potential inconsistencies or missing details.
This analysis should help team leaders guide support workers to improve their note-taking practices.


- <u> User </u>:As a team leader, I want to export client notes for reporting and analysis purposes.

    <u> Acceptance Criteria </u>:  There should be an option to export client notes, either individually or in bulk, in a downloadable format such as PDF or CSV.

- <u> User </u>:As a support worker, I want to easily clock in and out of my shifts to accurately track my working hours.

    <u> Acceptance Criteria </u>:  There should be a dedicated interface to clock in and out. Clocking in and out should record the timestamp of the action.

- <u> User </u>:As a support worker, I want to receive reminders for scheduled breaks during my shift.

    <u> Acceptance Criteria </u>:  The application should send timely notifications reminding me to take scheduled breaks.
The reminders should include details about the recommended break duration.

- <u> User </u>: As a support worker, I want a clear overview of my shifts for the week, including start and end times.

    <u> Acceptance Criteria </u>:  There should be a weekly calendar view that displays all scheduled shifts for the support worker.
Each shift should show the start and end times to help with planning.

- <u> User </u>: As a team leader, I want to view and track the clocking compliance of my team members.

    <u> Acceptance Criteria </u>:  The team leader's dashboard should provide a visual representation of each team member's clocking in and out status.
Compliance status should be easily distinguishable (e.g., green for on time, red for late).

- <u> User </u>: As a support worker, I want to receive notifications about upcoming shifts, including start times.

    <u> Acceptance Criteria </u>:  The application should send reminders or notifications to support workers in advance of their upcoming shift Reminders should include the shift start time and any relevant information

- <u> User </u>: As a  manager I would like to be able to assign a shift to a worker so that they can work with that Client

    <u> Acceptance Criteria </u>:  There needs to be a way for managers to be able to see the list of workers, and clients and assign them to each other. So that workers are able to see the details about Clients they are working with.

- <u> User </u>:As a support worker I want to be led through the note taking process so that I do not need to remember the structure or worry about missing information.

    <u> Acceptance Criteria </u>:  Workers when entering progress notes should be led through the process. After choosing a shift they wish to enter notes for, they need to be presented with different text boxes to enter different information. These should not be able to be left blank, and hints should be provided to ensure that the workers knows what information needs to be entered. 
 
## R5: Wireframes

### Login Screen

Desktop and Mobile
![LoginScreen](docs/wireframes/loginscreen.png)

### Homepage

![Homepage](docs/wireframes/homepagedraft.png)
### Clock-in View

Desktop and Mobile
![Clockin](docs/wireframes/clockin.png)

### Add Notes
![AddNotes](!docs/../docs/wireframes/addnotes.png)

### View all Clients
![ViewAllClients](!/../docs/wireframes/allclients.png)

### Calendar View

![CalendarView](!/../docs/wireframes/calednarview.png)

### Client Note List

![ClientNoteList](!/../docs/wireframes/client%20note%20list.png)

### ClientDashBoard

![ClientDashboard](!/../docs/wireframes/clientdashboard.png)

### Client Indvidual View

![ClientIndividualView](!/../docs/wireframes/clientindividualview.png)

### Client List View

![ClientListViewD](docs/wireframes/clientlistdesktop.png)
![ClientListViewM](docs/wireframes/clientmobile.png)
![ClientListViewM2](/docs/wireframes/clientmobile2.png)

### Rosters

![RosterViewD](docs/wireframes/rosterview.png)
![DesktopRosters](docs/wireframes/desktoprosters.png)
![DesktopRosters2](docs/wireframes/desktoprosters2.png)

![RosterViewM](docs/wireframes/rosterviewM.png)
![MobileRosters](docs/wireframes/rostersm1.png)
![MobileRosters2](docs/wireframes/rostersviewm2.png)

### Note View

![Notetaking1](docs/wireframes/notes1.png)
![Notetaking2](docs/wireframes/notes2.png)

### Team viewer

![teamviewer](docs/wireframes/teamsview.png)

### Worker List

![WorkerList](docs/wireframes/workerslist.png)

## R6: Standups and Project Managament with Trello

### Board link

https://trello.com/b/XsJS04DM/t3a2


### Update 1
1. Everyone has now has tasks which they are working on. R1, R2 and R5.
2. None yet
3. Complete R1, R2 and R5 and complete project management board with smaller tasks for each criteria
4. Managing different schedules can make planning/communication harder at times


![Update1Board](docs/TrelloImages/day1.PNG)

### Update 2

1. Have added R1, R2, R4, R6.
2. Still working on the scope of what our application does but not an issue, just something to think about.
3. Finish Part A
4. Learnt about how easy it is for scope to get away too quickly.
![Update2Board](docs/TrelloImages/day2.PNG)

### Update 3 
1. All requirments have been added and are ready to submit for assessment. 
2. Virtual communication can be difficult at times.
3. Next step is to plan who will be working on which part of the code. Planning deadlines and how we want to tackle it. 
4. Learnt that its important to have backups of things incase things fail or dont update correctly. 
![Update3Board](docs/TrelloImages/day3.png)

![trelloimg](docs/TrelloImages/24082023.png)
![trelloimg](docs/TrelloImages/25082023.png)
![trelloimg](docs/TrelloImages/26082023.png)
![trelloimg](docs/TrelloImages/27082023.png)
![trelloimg](docs/TrelloImages/28082023.png)
![trelloimg](docs/TrelloImages/29082023.png)
![trelloimg](docs/TrelloImages/30082023.png)
![trelloimg](docs/TrelloImages/31082023.png)
![trelloimg](docs/TrelloImages/01092023.png)
![trelloimg](docs/TrelloImages/02092023.png)
