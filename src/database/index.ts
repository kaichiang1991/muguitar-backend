import { Sequelize } from 'sequelize'
import Course, { initCourseTable } from './model/Course'
import Student, { initStudentTable } from './model/Student'
import Teacher, { initTeacherTable } from './model/Teacher'
import User, { initUserTable } from './model/User'

const sequelize = new Sequelize({
  dialect: 'mariadb',
  database: 'MuGuitar',
  username: 'root',
  password: 'abcd1234',
  host: 'localhost',
  define: {
    timestamps: false,
  },
})

export async function initDatabase() {
  try {
    console.log('try to connect database...')
    await sequelize.authenticate()
    console.log('connect succes.')
  } catch (e) {
    console.log('auth fail', e)
  }

  await initUserTable()
  await initCourseTable()
  await initStudentTable()
  await initTeacherTable()

  await initTableAssociation()

  await sequelize.sync()
}

// 初始化 Table 間的關聯
const initTableAssociation = () => {
  Teacher.hasOne(User, {
    sourceKey: 'id',
    foreignKey: 'teacher_id',
  })
  User.belongsTo(Teacher, {
    foreignKey: 'teacher_id',
  })

  Teacher.hasMany(Student, {
    sourceKey: 'id',
    foreignKey: 'teacher_id',
  })
  Student.belongsTo(Teacher, {
    foreignKey: 'teacher_id',
  })

  Student.hasOne(Course, {
    sourceKey: 'id',
    foreignKey: 'student_id',
  })

  Course.belongsTo(Student, {
    foreignKey: 'student_id',
  })
}

export default sequelize
