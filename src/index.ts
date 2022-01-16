import express from 'express'
import { initDatabase } from './database'
import apiRouter from './router/api'

console.log('port', process.env.PORT)
const app: express.Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('root')
})

app.use('/api', apiRouter)

const port: number = Number(process.env.PORT) || 3000
app.listen(port, () => {
  console.log(`server is listening to port ${port}...`)
})

initDatabase()
