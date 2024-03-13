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

    const user = await db
      .insertQuery()
      .table('users')
      .insert({
        nombre: name,
        apellido: lastName,
        cargo: charge,
        fotoURL: 'notyet',
      })
      .returning('id')

    return user[0]
  }

  async upload({ request, params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const userImage = request.file('foto', {
      size: '7mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })
    if (!userImage) {
      console.log('No paso nada')
      return response.json({ err: 'Se serio mrk no mandaste nada' })
    } else {
      await userImage.move('uploads', {
        name: userImage.clientName,
        overwrite: true,
      })

      await user.merge({
        fotoURL: userImage.fileName,
      })
    }
    return user
  }
}
