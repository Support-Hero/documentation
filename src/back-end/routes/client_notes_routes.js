import { Router } from 'express'
import { ClientNotesModel, UserModel, ClientModel } from '../db.js'

const router = Router()

// GET all notes
router.get('/', async (req, res) => res.send(await ClientNotesModel.find()
  .populate({ path: 'author'})
  .populate({ path: 'client'})
))

// Get singular note
router.get('/:id', async (req, res) => {
  try {
    const note = await ClientNotesModel.findById(req.params.id)
      .populate({ path: 'author'})
      .populate({ path: 'client'})
    if (note) {
      res.send(note)
    } else {
      res.status(404).send({ error: 'Note not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// POST a new note
router.post('/', async (req, res) => {
  try {
    const newNote = await ClientNotesModel.create(req.body)
    res.status(201).send(newNote)
  }
  catch (err) {
    if (err.name == 'ValidationError') {
    res.status(400).send({ error: err.message })
  } else {
    res.status(500).send({ error: err.message })
  }}
})

// PUT update a note
router.put('/:id', async (req, res) => {
  try {
    const updatedClientNote = {}
    if (req.body.date) {
      updatedClientNote.date = req.body.date
    }
    if (req.body.goals) {
      updatedClientNote.goals = req.body.goals
    }
    if (req.body.presentation) {
      updatedClientNote.presentation = req.body.presentation
    }
    if (req.body.actions) {
      updatedClientNote.actions = req.body.actions
    }
    if (req.body.outcome) {
      updatedClientNote.outcome = req.body.outcome
    }
    if (req.body.followUp) {
      updatedClientNote.followUp = req.body.followUp
    }
    if (req.body.followUpNote) {
      updatedClientNote.followUpNote = req.body.followUpNote
    }
    if (req.body.isMgrAuthorised) {
      updatedClientNote.isMgrAuthorised = req.body.isMgrAuthorised
    }
    if (req.body.author) {
      const updateAuthor = await UserModel.findById(req.body.author)
      if (updateAuthor) {
        updatedClientNote.author = updateAuthor
      } else {
        res.status(400).send({ error: 'User not found' })
      }
    }
    if (req.body.client) {
      const updateClient = await ClientModel.findById(req.body.client)
      if (updateClient) {
        updatedClientNote.client = updateClient
      } else {
        res.status(400).send({ error: 'Client not found' })
      }
    }
    const clientNotes = await ClientNotesModel.findByIdAndUpdate(req.params.id, updatedClientNote, { new: true })
    if (clientNotes) {
      res.send(clientNotes)
    } else {
      res.status(404).send({ error: 'Client notes not found' })
    }
  }
  catch (err) {
      res.status(500).send({ error: err.message })
    }
})

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const note = await ClientNotesModel.findByIdAndDelete(req.params.id)
    if (note) {
      res.sendStatus(200)
    } else {
      res.status(404).send({ error: 'Note not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

export default router