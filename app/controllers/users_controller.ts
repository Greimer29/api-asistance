// import type { HttpContext } from '@adonisjs/core/http'
//import User from '#models/user'
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class UsersController {
  async index() {
    return User.all()
  }

  async store({ request }: HttpContext) {
    const name = request.input('name')
    const lastName = request.input('lastName')
    const charge = request.input('charges')

    const newPerson = await db.insertQuery().table('users').insert({
      nombre: name,
      apellido: lastName,
      cargo: charge,
    })

    return newPerson
  }
}
