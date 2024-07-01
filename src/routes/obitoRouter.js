const express = require('express')
const Obito = require('../common/entities/obito')
const Funeraria = require('../common/entities/funeraria')
const ObitoRepository = require('../repositories/ObitoRepository')
const CreateObitoCommand = require('../resources/createObito/createObitoCommand')
const FunerariaRepository = require('../repositories/FunerariaRepository')
const CreateObitoController = require('../resources/createObito/createObitoController')
const GetMyFunerariasQuery = require('../resources/getMyFunerarias/getMyFunerariasQuery')
const GetMyObitosController = require('../resources/getMyObitos/getMyObitosController')
const GetMyObitosQuery = require('../resources/getMyObitos/getMyObitosQuery')
const EditObitoCommand = require('../resources/editObito/editObitoCommand')
const EditObitoController = require('../resources/editObito/editObitoController')
require('dotenv').config()

const router = express.Router()

const funerariaRepository = new FunerariaRepository(process.env.DATABASE_URL)
const obitoRepository = new ObitoRepository(process.env.DATABASE_URL)
const createObitoCommand = new CreateObitoCommand(obitoRepository)
const getMyFunerariasQuery = new GetMyFunerariasQuery(funerariaRepository)
const createObitoController = new CreateObitoController(createObitoCommand, getMyFunerariasQuery)
const getMyObitosQuery = new GetMyObitosQuery(obitoRepository)
const getMyObitosController = new GetMyObitosController(getMyObitosQuery, getMyFunerariasQuery)
const editObitoCommand = new EditObitoCommand(obitoRepository, funerariaRepository)
const editObitoController = new EditObitoController(editObitoCommand)

const { validateUser } = require('../middlewares/ValidateUser')

router.post('/', validateUser, createObitoController.execute())
router.get('/:funerariaid', validateUser, getMyObitosController.execute())
router.put('/edit/:obitoid', validateUser, editObitoController.execute())



module.exports = router