import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { hashSync } from 'bcrypt'
dotenv.config()

// Function to close connection to the database
async function dbClose() {
  await mongoose.connection.close()
}

// Open a connection to the database
await mongoose.connect(process.env.ATLAS_DB_URL)

// Defining the user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  isManager: { type: Boolean, required: true },
  clients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Client'}]
})

// Encrypt password
userSchema.pre('save', async function (next) {
  if (!this.isModified) {
    next()
  }

  const hashedPassword = hashSync(this.password, 10)
  this.password = hashedPassword
})

// Defining the user model from the user schema
const UserModel = mongoose.model('User', userSchema)

// Defining the client notes schema
const clientNotesSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  goals: { type: String, required: true },
  presentation: { type: String, required: true },
  actions: { type: String, required: true },
  outcome: { type: String, required: true },
  followUp: { type: Boolean, required: true },
  followUpNote: { type: String },
  isMgrAuthorised: { type: Boolean, required: true },
  author: {type: mongoose.ObjectId, ref: 'User', required: true },
  client: {type: mongoose.ObjectId, ref: 'Client', required: true }
})

// Defining the client notes model from the client notes schema
const ClientNotesModel = mongoose.model('ClientNotes', clientNotesSchema)

// Defining the client notes schema

// Defining the client schema
const clientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true},
  phoneNumber: { type: String, required: true },
  clientNotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'ClientNotes'}],
  assignedWorkers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})
// Defining the client model from the client schema
const ClientModel = mongoose.model('Client', clientSchema)


const rosterSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  shiftStart: { type: String, required: true },
  shiftEnd: { type: String, required: true },
  break: { type: Boolean, required: true },
  breakStart: { type: String, required: false },
  breakEnd: { type: String, required: false },
  worker: {type: mongoose.ObjectId, ref: 'User', required: true },
})

// Defining the client notes model from the client notes schema
const RostersModel = mongoose.model('Roster', rosterSchema)

export { UserModel, ClientModel, ClientNotesModel,RostersModel, dbClose }