// import type { HttpContext } from '@adonisjs/core/http'
//import User from '#models/user'
import User from '#models/user'
import { cuid } from '@adonisjs/core/helpers'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'

export default class UsersController {
  async index() {
    return User.all()
  }

  async store({ request }: HttpContext) {
    const name = request.input('name')
    const lastName = request.input('lastName')
    const charge = request.input('charges')
    const userImage = request.file('foto', {
      size: '7mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    await userImage?.move(app.makePath('uploads'), {
      name: `${cuid()}.${userImage.extname}`,
    })

    const newPerson = await db.insertQuery().table('users').insert({
      nombre: name,
      apellido: lastName,
      cargo: charge,
      fotoURL: userImage?.fileName,
    })
    return newPerson
  }
}
