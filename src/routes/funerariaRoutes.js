const express = require('express')
const Funeraria = require('../common/entities/funeraria')
const FunerariaRepository = require('../repositories/FunerariaRepository')
const CreateFunerariaCommand = require('../resources/createFuneraria/createFunerariaCommand')
const CreateFunerariaController = require('../resources/createFuneraria/createFunerariaController')
const GetMyFunerariasController = require('../resources/getMyFunerarias/getMyFunerariasController')
const GetMyFunerariasQuery = require('../resources/getMyFunerarias/getMyFunerariasQuery')
const EditFunerariaCommand = require('../resources/editFuneraria/editFunerariaCommand')
const EditFunerariaController = require('../resources/editFuneraria/editFunerariaController')
const DeleteFunerariaCommand = require('../resources/deleteFuneraria/deleteFunerariaCommand')
const DeleteFunerariaController = require('../resources/deleteFuneraria/deleteFunerariaController')
require('dotenv').config()

const router = express.Router()

const funerariaRepository = new FunerariaRepository(process.env.DATABASE_URL)
const createFunerariaCommand = new CreateFunerariaCommand(funerariaRepository)
const editFunerariaCommand = new EditFunerariaCommand(funerariaRepository)
const deleteFunerariaCommand = new DeleteFunerariaCommand(funerariaRepository)
const editFunerariaController = new EditFunerariaController(editFunerariaCommand)
const deleteFunerariaController = new DeleteFunerariaController(deleteFunerariaCommand)
const createFunerariaController = new CreateFunerariaController(createFunerariaCommand)
const getMyFunerariasController = new GetMyFunerariasController(new GetMyFunerariasQuery(funerariaRepository))
const getMyFunerariasQuery = new GetMyFunerariasQuery(funerariaRepository)

const { validateUser } = require('../middlewares/ValidateUser')

router.post('/', validateUser, createFunerariaController.execute())
router.get('/myfunerarias', validateUser, getMyFunerariasController.execute())
router.put('/:funerariaid', validateUser, editFunerariaController.execute())
router.delete('/:funerariaid', validateUser, deleteFunerariaController.execute())


module.exports = router