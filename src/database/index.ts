import { Sequelize } from 'sequelize'
import { initTeacherTable } from './Teacher'

const sequelize = new Sequelize({
  dialect: 'mysql',
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

  await initTeacherTable()
}

export default sequelize
