const utils = require("../../common/utils")
const fsPromises = require('fs/promises')
const path = require('path')

class CreateObitoPhotoController {
    constructor(createObitoPhotoCommand) {
        this.createObitoPhotoCommand = createObitoPhotoCommand
    }

    execute() {
        let createObitoPhotoCommand = this.createObitoPhotoCommand
        return async function (req, res) {
            let photo = req.file
            let obitoid = req.params.obitoid
            const ext = path.extname(photo.originalname).slice(1).toLowerCase();

            const obito = await createObitoPhotoCommand.execute(obitoid, ext)

            fsPromises.rename(photo.path, `uploads/${obito.data}`)
            if (!obito.success) {
                return res.status(400).json({ error: obito.error })
            }
            return res.status(200).json(obito)
        }
    }
}

module.exports = CreateObitoPhotoController