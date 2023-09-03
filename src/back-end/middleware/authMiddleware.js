import jwt from 'jsonwebtoken'
import { UserModel } from "../db.js"
import dotenv from 'dotenv'

dotenv.config()

// This middleware, checks the bearer token in the authorization header to see if the user is authorized
const isLoggedIn = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.user = await UserModel.findById(decoded.id).select('-password')


      next()
    }
    catch (err) {
      res.status(401).send({ error: 'Not authorised' })
    }
  } else {
    res.status(401).send({ error: 'Not authorised' })
  }
}

export { isLoggedIn }