// import type { HttpContext } from '@adonisjs/core/http'
//import User from '#models/user'
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import fs from 'node:fs'
import path from 'node:path'

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

      await user
        .merge({
          foto_url: userImage.fileName,
        })
        .save()

      return user
    }
  }

  async delete({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    if (!user) {
      return response.json({ data: 'Mano ese tipo ya no existe' })
    } else {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const foto_url = user.foto_url
      if (foto_url) {
        const imagePath = path.join('uploads', foto_url)
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath)
        }
      } else {
        console.log('No se elimino ninguna imagen')
      }
      await user.delete()
      return user
    }
  }
}
