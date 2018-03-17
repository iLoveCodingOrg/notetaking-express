const router = require('express').Router()

// get all
router.get('/', (req, res, next)=>{
  res.send('All notes')
})

// get single
router.get('/:id', (req, res, next)=>{
  res.send('get note by id')
})

// Create
router.post('/', (req, res, next)=>{
  res.send('Create note')
})

// Update
router.put('/:id', (req, res, next)=>{
  res.send('update note')
})

// Delete
router.delete('/', (req, res, next)=>{
  res.send('delete note')
})

module.exports = router