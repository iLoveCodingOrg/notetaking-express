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
router.post('/',
  inputValidation,
  (req, res, next)=>{
    const newNote = new NoteModel({
      title: req.body.title,
      body: req.body.body
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

function inputValidation(req, res, next){
  const { title, body } = req.body
  const missingFileds = []

  if(!title){
    missingFileds.push('title')
  }

  if(!body){
    missingFileds.push('body')
  }

  if(missingFileds.length){
    res
      .status(400)
      .send(`The following fields are missing: ${missingFileds.join(', ')}`)
  }else{
    next()
  }
}

module.exports = router