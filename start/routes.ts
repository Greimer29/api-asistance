/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const userController = () => import('#controllers/users_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('apiv1/users', [userController, 'index'])
router.post('apiv1/users/add', [userController, 'store'])
