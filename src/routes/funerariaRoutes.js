const express = require('express')
const Funeraria = require('../common/entities/funeraria')
const FunerariaRepository = require('../repositories/FunerariaRepository')
const CreateFunerariaCommand = require('../resources/createFuneraria/createFunerariaCommand')
const CreateFunerariaController = require('../resources/createFuneraria/createFunerariaController')
const GetMyFunerariasController = require('../resources/getMyFunerarias/getMyFunerariasController')
const GetMyFunerariasQuery = require('../resources/getMyFunerarias/getMyFunerariasQuery')
require('dotenv').config()

const router = express.Router()

const funerariaRepository = new FunerariaRepository(process.env.DATABASE_URL)
const createFunerariaCommand = new CreateFunerariaCommand(funerariaRepository)
const createFunerariaController = new CreateFunerariaController(createFunerariaCommand)
const getMyFunerariasController = new GetMyFunerariasController(new GetMyFunerariasQuery(funerariaRepository))
const getMyFunerariasQuery = new GetMyFunerariasQuery(funerariaRepository)

const { validateUser } = require('../middlewares/ValidateUser')

router.post('/', validateUser, createFunerariaController.execute())
router.get('/myfunerarias', validateUser, getMyFunerariasController.execute())


module.exports = router