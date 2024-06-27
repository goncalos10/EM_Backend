const express = require('express')
const { User } = require('../common/entities/user')
const CreateUserCommand = require('../resources/createUser/createUserCommand')
const CreateUserController = require('../resources/createUser/createUserController')
const LoginController = require('../resources/login/loginController')
const LoginQuery = require('../resources/login/loginQuery')
const UserRepository = require('../repositories/UserRepository')
const { validateUser } = require('../middlewares/ValidateUser')
require('dotenv').config()

const router = express.Router()

const userRepository = new UserRepository(process.env.DATABASE_URL)
const createUserCommand = new CreateUserCommand(userRepository)
const loginQuery = new LoginQuery(userRepository)
const createUserController = new CreateUserController(createUserCommand)
const loginController = new LoginController(loginQuery)
router.post('/', createUserController.execute())
router.post('/auth', loginController.execute())

router.get('/', validateUser, (req, res) => {
    return res.status(200).json(req.user)
})

module.exports = router