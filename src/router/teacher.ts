import express from 'express'
import BaseController from '../controller/BaseController'
import TeacherController from '../controller/TeacherController'

const router = express.Router()
const instance: BaseController = TeacherController.getInstance()
// get
router.get('/:name', instance.getOne)
router.get('/', instance.getAll)
// post
router.post('/', instance.addOne)
// patch
router.patch('/', instance.updateOne)
// delete
router.delete('/:name', instance.deleteOne)
router.delete('/', instance.deleteAll)

export default router
