import allOp from '.'
import Teacher from '../model/Teacher'
import User from '../model/User'

export default class UserOp {
  static getAll = async (): Promise<Array<User>> => User.findAll()

  static getById = async (id: number): Promise<User> => {
    const user: User = await User.findOne({ where: { id } }).catch(
      err => err.name
    )
    return user
  }

  static getByAccount = async (account: string): Promise<User> => {
    const user: User = await User.findOne({ where: { account } }).catch(
      err => err.name
    )
    return user
  }

  static newOne = async (
    teacher_id: number,
    account: string,
    password: string,
    username: string
  ): Promise<User | string> => {
    console.log({ account, username, teacher_id })
    const newUser: User = await User.create({
      account,
      password,
      username,
      teacher_id,
    }).catch(err => err.name)

    return newUser
  }

  static updateOne = async (
    account: string,
    password?: string,
    username?: string
  ) => {
    const user: User = await this.getByAccount(account)

    // 錯誤訊息
    if (typeof user === 'string') {
      return user
    }

    return user?.update({ password, username })
  }

  static deleteOne = async (account: string): Promise<number> =>
    User.destroy({ where: { account } })

  static deleteAll = async () => User.truncate()
}
