import express from 'express'
import TeacherController from '../controller/TeacherController'

const router = express.Router()
// get
router.get('/:name', TeacherController.getInstance().getOne)
router.get('/', TeacherController.getInstance().getAll)
// post
router.post('/', TeacherController.getInstance().addOne)
// patch
router.patch('/', TeacherController.getInstance().updateOne)
// delete
router.delete('/:name', TeacherController.getInstance().deleteOne)
router.delete('/', TeacherController.getInstance().deleteAll)

export default router
