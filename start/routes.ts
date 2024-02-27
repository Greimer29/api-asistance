/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/users_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('users', (ctx) => {
  return new UsersController().store(ctx)
})
