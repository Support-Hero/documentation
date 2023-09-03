import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const generateToken = (id, isManager) => {
  return jwt.sign({ id, isManager }, process.env.JWT_SECRET_KEY,{
    expiresIn: '1d',
  })
}

export default generateToken
