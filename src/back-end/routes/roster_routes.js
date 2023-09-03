import { Router } from 'express'
import { ClientNotesModel, UserModel, ClientModel, RostersModel } from '../db.js'

const router = Router()

// GET all rosters
router.get('/', async (req, res) => {
  const dat = await RostersModel.find().populate({ path: 'worker' })
  const transformedData = dat.reduce((result, shift) => {
    const workerIndex = result.findIndex((item) => item.worker._id === shift.worker._id);
  
    if (workerIndex === -1) {
        // If worker not found, add a new worker entry
        result.push({
            worker: shift.worker,
            shifts: [shift],
        });
    } else {
        // If worker found, push the shift into their existing shifts array
        result[workerIndex].shifts.push(shift);
    }
  
    return result;
  }, []);
  res.send(transformedData)
}
)

// Get singular roster
router.get('/:id', async (req, res) => {
  try {
    const roster = await RostersModel.findById(req.params.id)
      .populate({ path: 'woorker' })
    if (roster) {
      res.send(roster)
    } else {
      res.status(404).send({ error: 'roster not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// POST a new roster
router.post('/', async (req, res) => {
  try {
    const newRoster = await RostersModel.create(req.body)
    res.status(201).send(newRoster)
  }
  catch (err) {
    if (err.name == 'ValidationError') {
      res.status(400).send({ error: err.message })
    } else {
      res.status(500).send({ error: err.message })
    }
  }
})

// PUT update a roster
router.put('/:id', async (req, res) => {
  try {
    const updatedRoster = {}
    if (req.body.date) {
      updatedRoster.date = req.body.date
    }
    if (req.body.shiftStart) {
      updatedRoster.shiftStart = req.body.shiftStart
    }
    if (req.body.shiftEnd) {
      updatedRoster.shiftEnd = req.body.shiftEnd
    }
    if (req.body.break) {
      updatedRoster.break = req.body.break
    }
    if (req.body.breakStart) {
      updatedRoster.breakStart = req.body.breakStart
    }
    if (req.body.breakEnd) {
      updatedRoster.breakEnd = req.body.breakEnd
    }
    const roster = await RostersModel.findByIdAndUpdate(req.params.id, updatedRoster, { new: true })
    if (roster) {
      res.send(roster)
    } else {
      res.status(404).send({ error: 'roster not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const roster = await RostersModel.findByIdAndDelete(req.params.id)
    if (roster) {
      res.sendStatus(200)
    } else {
      res.status(404).send({ error: 'Roster not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

export default router