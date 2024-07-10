const express = require('express')
const UserRepository = require('../repositories/UserRepository')
const LocalRepository = require('../repositories/LocalRepository')
const CreateLocalController = require('../resources/createLocal/createLocalController')
const CreateLocalCommand = require('../resources/createLocal/createLocalCommand')
const EditLocalController = require('../resources/editLocal/editLocalController')
const EditLocalCommand = require('../resources/editLocal/editLocalCommand')
const GetLocaisController = require('../resources/getLocais/getLocaisController')
const GetLocaisQuery = require('../resources/getLocais/getLocaisQuery')
const GetUsersFunerariasController = require('../resources/getUsersFunerarias/getUsersFunerariasController')
const GetUsersFunerariasQuery = require('../resources/getUsersFunerarias/getUsersFunerariasQuery')

require('dotenv').config()

const router = express.Router()

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

router.post('/locais', createLocalController.execute())
router.put('/locais/:localid', editLocalController.execute())
router.get('/locais/:localtipo', getLocaisController.execute())
router.get('/usersFunerarias', getUsersFunerariasController.execute())


module.exports = router