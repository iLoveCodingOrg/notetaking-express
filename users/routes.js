const router = require('express').Router()
const UserModel = require('./model')
const bcrypt = require('bcryptjs')

router.post('/login', (req, res, next)=>{
  res.send('login')
})

router.post('/register',
  registerInputValidation,
  isEmailRegistered,
  hashPassword,
  (req, res, next)=>{
    console.log(req.body.password)
    const newUser = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })

    newUser
      .save()
      .then((document)=>{
        if(document){
          document.password = undefined
          res.json(document)
        }else{
          res.send('document did not save')
        }
      })
      .catch((err)=>{
        console.log(err)
        res.send('error happened')
      })
  }
)

router.get('/:id', (req, res, next)=>{
  UserModel
    .findById(req.params.id)
    .then((result)=>{
      if(!result){
        res
          .status(404)
          .send('User not found')
      }else{
        result.password = undefined
        res.json(result)
      }
    })
    .catch((err)=>{
      console.log(err)
      res.status(500).send('Error Happened')
    })
})

function registerInputValidation(req, res, next){
  const { firstName, lastName, email, password } = req.body
  const missingFileds = []

  if(!firstName){
    missingFileds.push('firstName')
  }
  if(!lastName){
    missingFileds.push('lastName')
  }
  if(!email){
    missingFileds.push('email')
  }
  if(!password){
    missingFileds.push('password')
  }

  if(missingFileds.length){
    res
      .status(400)
      .send(`The following fields are missing: ${missingFileds.join(', ')}`)
  }else{
    next()
  }
}

function isEmailRegistered(req, res, next){
  const { email } = req.body
  
  UserModel.findOne({ email })
    .then((result)=>{
      if(result){
        res
          .status(400)
          .send(`${email} is already registered`)
      }else{
        next()
      }
    })
    .catch((err)=>{
      console.log(err)
      res.status(500).send('Error happened')
    })
}

function hashPassword(req, res, next){
  const { password } = req.body

  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, passwordHash) {
        if(err){
          res.status(500).send('err')
        }else{
          req.body.password = passwordHash
          next()
        }
      })
  })
}

module.exports = router