// import type { HttpContext } from '@adonisjs/core/http'
import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async store({ request }: HttpContext) {
    const body = request.body
    return body
  }
}
