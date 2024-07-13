const express = require('express')
const UserRepository = require('../repositories/UserRepository')
const LocalRepository = require('../repositories/LocalRepository')
const FunerariaRepository = require('../repositories/FunerariaRepository')
const CreateLocalController = require('../resources/createLocal/createLocalController')
const CreateLocalCommand = require('../resources/createLocal/createLocalCommand')
const EditLocalController = require('../resources/editLocal/editLocalController')
const EditLocalCommand = require('../resources/editLocal/editLocalCommand')
const GetLocaisController = require('../resources/getLocais/getLocaisController')
const GetLocaisQuery = require('../resources/getLocais/getLocaisQuery')
const GetUsersFunerariasController = require('../resources/getUsersFunerarias/getUsersFunerariasController')
const GetUsersFunerariasQuery = require('../resources/getUsersFunerarias/getUsersFunerariasQuery')
const GetMyFunerariasQuery = require('../resources/getFunerarias/getFunerariasQuery')
const GetMyFunerariasController = require('../resources/getFunerarias/getFunerariasController')

require('dotenv').config()

const router = express.Router()

const funerariasRepository = new FunerariaRepository(process.env.DATABASE_URL)
const localRepository = new LocalRepository(process.env.DATABASE_URL)
const userRepository = new UserRepository(process.env.DATABASE_URL)
const createLocalCommand = new CreateLocalCommand(localRepository)
const createLocalController = new CreateLocalController(createLocalCommand)
const editLocalCommand = new EditLocalCommand(localRepository)
const editLocalController = new EditLocalController(editLocalCommand)
const getLocaisQuery = new GetLocaisQuery(localRepository)
const getLocaisController = new GetLocaisController(getLocaisQuery)
const getUsersFunerariasQuery = new GetUsersFunerariasQuery(userRepository)
const getUsersFunerariasController = new GetUsersFunerariasController(getUsersFunerariasQuery)
const getMyFunerariasQuery = new GetMyFunerariasQuery(funerariasRepository)
const getMyFunerariasController = new GetMyFunerariasController(getMyFunerariasQuery)

const { validateUser } = require('../middlewares/ValidateUser')

router.post('/locais', validateUser, createLocalController.execute())
router.put('/locais/:localid', validateUser, editLocalController.execute())
router.get('/locais/:localtipo', validateUser, getLocaisController.execute())
router.get('/usersFunerarias', validateUser, getUsersFunerariasController.execute())
router.get('/funerarias', validateUser, getMyFunerariasController.execute())


module.exports = router