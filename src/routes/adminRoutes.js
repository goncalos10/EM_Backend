const express = require('express')
const LocalRepository = require('../repositories/LocalRepository')
const CreateLocalController = require('../resources/createLocal/createLocalController')
const CreateLocalCommand = require('../resources/createLocal/createLocalCommand')
const EditLocalController = require('../resources/editLocal/editLocalController')
const EditLocalCommand = require('../resources/editLocal/editLocalCommand')
const GetLocaisController = require('../resources/getLocais/getLocaisController')
const GetLocaisQuery = require('../resources/getLocais/getLocaisQuery')

require('dotenv').config()

const router = express.Router()

const localRepository = new LocalRepository(process.env.DATABASE_URL)
const createLocalCommand = new CreateLocalCommand(localRepository)
const createLocalController = new CreateLocalController(createLocalCommand)
const editLocalCommand = new EditLocalCommand(localRepository)
const editLocalController = new EditLocalController(editLocalCommand)
const getLocaisQuery = new GetLocaisQuery(localRepository)
const getLocaisController = new GetLocaisController(getLocaisQuery)

router.post('/locais', createLocalController.execute())
router.put('/locais/:localid', editLocalController.execute())
router.get('/locais/:localtipo', getLocaisController.execute())


module.exports = router