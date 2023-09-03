import { Router } from "express"
import { ClientModel, UserModel, ClientNotesModel } from "../db.js"

const router = Router()

// GET all clients
router.get('/', async (req, res) => 
  res.send(await ClientModel.find()
    .populate({ path: 'assignedWorkers' })
    .populate({ path: 'clientNotes' })
  ))

// GET singular client
router.get('/:id', async (req, res) => {
  try {
    const client = await ClientModel.findById(req.params.id)
      .populate({ path: 'assignedWorkers' })
      .populate({ path: 'clientNotes' })
    if (client) {
      res.send(client)
    } else {
      res.status(404).send({ error: 'Client not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// POST a new client
router.post('/', async (req, res) => {
  try {
    const newClient = await ClientModel.create(req.body)
    res.status(201).send(newClient)
  }
  catch (err) {
    if (err.name == 'ValidationError') {
    res.status(400).send({ error: err.message })
  } else {
    res.status(500).send({ error: err.message })
  }}
})

// PUT update a client
router.put('/:id', async (req, res) => {
  try {
    const updatedClient = {}
    if (req.body.firstName) {
      updatedClient.firstName = req.body.firstName
    }
    if (req.body.lastName) {
      updatedClient.lastName = req.body.lastName
    }
    if (req.body.address) {
      updatedClient.address = req.body.address
    }
    if (req.body.phoneNumber) {
      updatedClient.phoneNumber = req.body.phoneNumber
    }
    if (req.body.clientNotes) {
      const notes = await ClientNotesModel.find({ name: req.body.clientNotes })
      if (notes) {
        updatedClient.clientNotes = notes
      } else {
        res.status(400).send({ error: 'Client notes not found' })
      }
    }
    if (req.body.assignedWorkers) {
      const assginedWorker = await UserModel.find({ name: req.body.assignedWorkers })
      if (assginedWorker) {
        updatedClient.assignedWorkers = assginedWorker
      } else {
        res.status(400).send({ error: 'Workers not found' })
      }
    }
    const client = await ClientModel.findByIdAndUpdate(req.params.id, updatedClient, { new: true })
    if (client) {
      res.send(client)
    } else {
      res.status(404).send({ error: 'Client not found' })
    }
  }
  catch (err) {
      res.status(500).send({ error: err.message })
    }
})


// Delete a client
router.delete('/:id', async (req, res) => {
  try {
    const client = await ClientModel.findByIdAndDelete(req.params.id)
    if (client) {
      res.sendStatus(200)
    } else {
      res.status(404).send({ error: 'Client not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

export default router