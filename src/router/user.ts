import express from 'express'
import UserController from '../controller/UserController'

const router = express.Router()
const instance: UserController = UserController.getInstance()
// get
router.get('/', instance.getAll)
router.get('/identify/:account/:password', instance.checkIdentify)
router.get('/:account', instance.getOne)
// post
router.post('/', instance.addOne)
// patch
router.patch('/', instance.updateOne)
// delete
router.delete('/:account', instance.deleteOne)
router.delete('/', instance.deleteAll)

export default router
