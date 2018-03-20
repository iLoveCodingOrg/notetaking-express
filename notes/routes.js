const router = require('express').Router()
const NoteModel = require('./model')
const passport = require('../auth')

// get all
router.get('/',
  (req, res, next)=>{
    NoteModel.find()
      .then((results)=>{
        if(!results){
          res
            .status(404)
            .send('No Notes found')
        } else {
          res.json(results)
        }
      })
      .catch((err)=>{
        console.log(err)
        res
          .status(500)
          .send('Error Happened')
      })
  }
)

// get single
router.get('/:id', (req, res, next)=>{
  NoteModel.findById(req.params.id)
    .then((results)=>{
      if(!results){
        res
          .status(404)
          .send('No Note found')
      } else {
        res.json(results)
      }
    })
    .catch((err)=>{
      console.log(err)
      res
        .status(500)
        .send('Error Happened')
    })
})

// Create
router.post('/',
  passport.authenticate('bearer', { session: false }),
  inputValidation,
  (req, res, next)=>{
    console.log(req.user)
    const newNote = new NoteModel({
      title: req.body.title,
      body: req.body.body,
      authorId: req.user._id
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
router.put('/:id', 
  passport.authenticate('bearer', { session: false }),
  updateInputValidation,
  (req, res, next)=>{
    NoteModel.findOneAndUpdate({ _id: req.params.id}, req.updateObj, {
      new: true
    })
      .then((results)=>{
        if(!results){
          res
            .status(404)
            .send('No Note found')
        } else {
          res.json(results)
        }
      })
      .catch((err)=>{
        console.log(err)
        res
          .status(500)
          .send('Error Happened')
      })
})

// Delete
router.delete('/:id',
  passport.authenticate('bearer', { session: false }),
  (req, res, next)=>{
    NoteModel.findOneAndRemove({ _id: req.params.id})
      .then((results)=>{
        if(!results){
          res
            .status(404)
            .send('No Note found')
        } else {
          res.send('Successfully deleted')
        }
      })
      .catch((err)=>{
        console.log(err)
        res
          .status(500)
          .send('Error Happened')
      })
  }
)

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

function updateInputValidation(req, res, next){
  const { title, body } = req.body
  const updateObj = {}

  if(title){
    updateObj.title = title
  }
  if(body){
    updateObj.body = body
  }

  req.updateObj = updateObj

  next()
}

module.exports = router