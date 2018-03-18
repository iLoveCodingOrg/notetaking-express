const router = require('express').Router()
const NoteModel = require('./model')

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
  const newNote = new NoteModel({
    title: 'Hello note',
    body: 'some body text'
  })

  newNote
    .save()
    .then((document)=>{
      if(document){
        res.json(document)
      }else{
        res.send('document did not save')
      }
    })
    .catch((err)=>{
      console.log(err)
      res.send('error happened')
    })

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