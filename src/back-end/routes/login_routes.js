import { Router } from "express"
import { authUser } from "../controllers/userControllers.js"

const router = Router()

router.post("/", authUser)

export default router