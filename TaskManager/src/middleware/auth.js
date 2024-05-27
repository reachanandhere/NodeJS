const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = async (req, res, next) =>{
   
  try {
   
    const token = req.header('Authorization')
    
    const decoded = jwt.verify(token, 'Unitedstates@2024')
 
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    
    if(!user) throw new Error()
    req.token = token
    req.user = user
    next()
  }catch(err){
    res.status(404).send({error: 'Please authenticate'})
  }
}
module.exports = auth