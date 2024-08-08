const express = require('express')
const router = express.Router()
const newuser = require('../model/Signup')
const jweb = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const secret = process.env.Secret_code

router.post('/signup', async (req, res) => {
  try {
    const { email, password, username } = req.body
    if (!email || !password || !username) {
      return res.json({ msg: 'mc bhar sb' })
    } else {
     
     bcrypt.hash(password,12,async function(err,be){
 
      const data = new newuser({ email, password:be, username })
      const token = jweb.sign({ email: email }, secret)
      // console.log(token)
      await data.save()
      res.json({ token })
     })
      
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body
    let data = await newuser.findOne({ email: email })
    if (!data) {
      return res.json({ msg: 'mc sahi se dal details' })
    }
      ismatch = await bcrypt.compare(password,data.password)

    if(ismatch){
      const token = jweb.sign({ email: email }, secret, { expiresIn: '3d' })
      // console.log(token)
      return res.status(200).json({ token })     
    }else{
      return res.status(400).json({ msg: 'laude sahi password ' })  
    }

  } catch (error) {
    console.log(error)
  }
})

module.exports = router
