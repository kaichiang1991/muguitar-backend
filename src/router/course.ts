import express from 'express'
import BaseController from '../controller/BaseController'
import CourseController from '../controller/CourseController'

const router = express.Router()
const instance: BaseController = CourseController.getInstance()
// get
router.get('/:id', instance.getOne)
router.get('/', instance.getAll)
// post
router.post('/', instance.addOne)
// patch
router.patch('/', instance.updateOne)
// delete
router.delete('/:id', instance.deleteOne)
router.delete('/', instance.deleteAll)

export default router
