import express from 'express'
import BaseController from '../controller/BaseController'
import StudentController from '../controller/StudentController'

const router = express.Router()
const instance: BaseController = StudentController.getInstance()
router.get('/:name', instance.getOne)
router.get('/', instance.getAll)
router.post('/', instance.addOne)
router.delete('/:name', instance.deleteOne)
router.delete('/', instance.deleteAll)
export default router
