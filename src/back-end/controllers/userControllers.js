import generateToken from './generateToken.js'
import { UserModel } from '../db.js'
import { compare } from 'bcrypt'

const authUser = async (req, res) => {
  const { email, password } = req.body
  const user = await UserModel.findOne({ email })

  if (user && (await compare(password, user.password))) {
    res.json({
      _id: user._id,
      email: user.email,
      isManager: user.isManager,
      firstName: user.firstName,
      lastName: user.lastName,
      token: generateToken(user._id, user.isManager)
    })
  } else {
    res.status(401).send({ error: 'Email or password incorrect' })
  }
}

export { authUser }