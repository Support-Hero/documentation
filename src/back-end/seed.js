import { ObjectId } from "mongodb"
import { UserModel, ClientModel, ClientNotesModel, dbClose, RostersModel } from "./db.js"
import { hashSync } from 'bcrypt'

// An array of fake users
const fakeUsers = [
  {
    _id: new ObjectId(),
    email: 'emma@example.com',
    password: hashSync('password', 10),
    phoneNumber: '0412345678',
    firstName: 'Emma',
    lastName: 'Wilson',
    isManager: false,
    clients: [],
  },
  {
    _id: new ObjectId(),
    email: 'alex@example.com',
    password: hashSync('pass123', 10),
    phoneNumber: '0499876543',
    firstName: 'Alex',
    lastName: 'Brown',
    isManager: false,
    clients: [],
  },
  {
    _id: new ObjectId(),
    email: 'sarah@example.com',
    password: hashSync('sarahpass', 10),
    phoneNumber: '0421987654',
    firstName: 'Sarah',
    lastName: 'Miller',
    isManager: true,
    clients: [],
  },
  {
    _id: new ObjectId(),
    email: 'david@example.com',
    password: hashSync('david987', 10),
    phoneNumber: '0410123456',
    firstName: 'David',
    lastName: 'Lee',
    isManager: false,
    clients: [],
  },
  {
    _id: new ObjectId(),
    email: 'olivia@example.com',
    password: hashSync('olivia555', 10),
    phoneNumber: '0432654321',
    firstName: 'Olivia',
    lastName: 'Smith',
    isManager: false,
    clients: [],
  }
]
// An array of fake clients
const fakeClients = [
  {
    _id: new ObjectId(),
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    phoneNumber: '0488888888',
    clientNotes: [],
    assignedWorkers: [fakeUsers[0], fakeUsers[1]]
  },
  {
    _id: new ObjectId(),
    firstName: 'Paul',
    lastName: 'Smith',
    address: '123 Fake Ave',
    phoneNumber: '0455555555',
    clientNotes: [],
    assignedWorkers: [fakeUsers[0]]
  },
  {
    _id: new ObjectId(),
    firstName: 'Paul',
    lastName: 'Smith',
    address: '123 Fake Ave',
    phoneNumber: '0455555555',
    clientNotes: [],
    assignedWorkers: [fakeUsers[3], fakeUsers[4]]
  },
  {
    _id: new ObjectId(),
    firstName: 'Paul',
    lastName: 'Smith',
    address: '123 Fake Ave',
    phoneNumber: '0455555555',
    clientNotes: [],
    assignedWorkers: [fakeUsers[3], fakeUsers[1], fakeUsers[2]]
  },
  {
    _id: new ObjectId(),
    firstName: 'Paul',
    lastName: 'Smith',
    address: '123 Fake Ave',
    phoneNumber: '0455555555',
    clientNotes: [],
    assignedWorkers: [fakeUsers[2]]
  }
]
// An array of fake client notes
const fakeClientNotes = [
    {
      _id: new ObjectId(),
      date: Date(),
      goals: 'lorem Ipsum',
      presentation: 'lorem Ipsum',
      actions: 'lorem Ipsum',
      outcome: 'lorem Ipsum',
      followUp: false,
      isMgrAuthorised: false,
      author: fakeUsers[0],
      client: fakeClients[3]
    },
    {
      _id: new ObjectId(),
      date: Date(),
      goals: 'lorem Ipsum',
      presentation: 'lorem Ipsum',
      actions: 'lorem Ipsum',
      outcome: 'lorem Ipsum',
      followUp: false,
      isMgrAuthorised: false,
      author: fakeUsers[0],
      client: fakeClients[3]
    },
    {
      _id: new ObjectId(),
      date: Date(),
      goals: 'lorem Ipsum',
      presentation: 'lorem Ipsum',
      actions: 'lorem Ipsum',
      outcome: 'lorem Ipsum',
      followUp: false,
      isMgrAuthorised: false,
      author: fakeUsers[0],
      client: fakeClients[3]
    },
    {
      _id: new ObjectId(),
      date: Date(),
      goals: 'lorem Ipsum',
      presentation: 'lorem Ipsum',
      actions: 'lorem Ipsum',
      outcome: 'lorem Ipsum',
      followUp: false,
      isMgrAuthorised: false,
      author: fakeUsers[0],
      client: fakeClients[3]
    },
    {
      _id: new ObjectId(),
      date: Date(),
      goals: 'lorem Ipsum',
      presentation: 'lorem Ipsum',
      actions: 'lorem Ipsum',
      outcome: 'lorem Ipsum',
      followUp: false,
      isMgrAuthorised: false,
      author: fakeUsers[0],
      client: fakeClients[3]
    },
]
const fakeRosters = [
  {
    _id: new ObjectId(),
   worker: fakeUsers[0],
   date:   "2023-09-01",
   shiftStart: "09:00",
   shiftEnd: "17:00",
   break: true,
   breakStart: "12:00",
   breakEnd: "12:30"
  },
  {
    _id: new ObjectId(),
   worker: fakeUsers[0],
   date:   "2023-09-02",
   shiftStart: "20:30",
   shiftEnd: "04:30",
   break: true,
   breakStart: "22:30",
   breakEnd: "01:00"
  },
  {
    _id: new ObjectId(),
   worker: fakeUsers[1],
   date: "2023-09-03",
   shiftStart: "10:00",
   shiftEnd: "16:00",
   break: false,
   breakStart: null,
   breakEnd: null
  },
  {
    _id: new ObjectId(),
   worker:fakeUsers[3],
   date: "2023-09-01",
   shiftStart: "12:00",
   shiftEnd: "16:00",
   break: true,
   breakStart: "13:00",
   breakEnd: "13:30"
  },
  {
    _id: new ObjectId(),
   worker: fakeUsers[3],
   date: "2023-09-02",
   shiftStart: "07:30",
   shiftEnd: "15:30",
   break: true,
   breakStart: "11:30",
   breakEnd: "12:00"
  },
  {
    _id: new ObjectId(),
    worker: fakeUsers[4],
   date: "2023-09-03",
   shiftStart: "02:00",
   shiftEnd: "10:00",
   break: true,
   breakStart: "05:00",
   breakEnd: "05:30"
  },
]
// add references in the fake arrays
fakeClients[0].clientNotes = [fakeClientNotes[0]]
fakeClients[1].clientNotes = [fakeClientNotes[1]]
fakeUsers[0].clients = [fakeClients[0], fakeClients[2]]
fakeUsers[1].clients = [fakeClients[2], fakeClients[3]]
fakeUsers[2].clients = [fakeClients[3], fakeClients[4]]

// Insert fake users into the database
await UserModel.deleteMany()
console.log('Deleted Users')
await UserModel.insertMany(fakeUsers)
console.log('Inserted users')

// Insert fake clients into the database
await ClientModel.deleteMany()
console.log('Deleted Clients')
await ClientModel.insertMany(fakeClients)
console.log('Inserted Clients')

// Insert fake client notes into the database
await ClientNotesModel.deleteMany()
console.log('Deleted Clients Notes')
await ClientNotesModel.insertMany(fakeClientNotes)
console.log('Inserted Clients Notes')

// Insert fake client notes into the database
await RostersModel.deleteMany()
console.log('Deleted rosters')
await RostersModel.insertMany(fakeRosters)
console.log('Inserted rosters')
dbClose()
