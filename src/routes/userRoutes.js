const express = require('express')
const { User } = require('../common/entities/user')
const CreateUserCommand = require('../resources/createUser/createUserCommand')
const CreateUserController = require('../resources/createUser/createUserController')
const UserRepository = require('../repositories/UserRepository')
require('dotenv').config()

const router = express.Router()

const userRepository = new UserRepository(process.env.DATABASE_URL)
const createUserCommand = new CreateUserCommand(userRepository)
const createUserController = new CreateUserController(createUserCommand)

router.post('/', createUserController.execute())

module.exports = router