import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user_routes.js'
import clientRoutes from './routes/client_routes.js'
import noteRoutes from './routes/client_notes_routes.js'
import loginRoutes from './routes/login_routes.js'
import { isLoggedIn } from './middleware/authMiddleware.js'
import rosterRoutes from './routes/roster_routes.js'

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (request, response) => response.send({ info: 'Support Hero!' }))

app.use('/users', isLoggedIn, userRoutes)

app.use('/clients', isLoggedIn, clientRoutes)

app.use('/notes', isLoggedIn, noteRoutes)

app.use('/rosters',isLoggedIn, rosterRoutes )

app.use('/login', loginRoutes)

export default app