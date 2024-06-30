const utils = require("../../common/utils")

class EditFunerariaController {
    constructor(editFunerariaCommand) {
        this.editFunerariaCommand = editFunerariaCommand
    }

    execute() {
        let editFunerariaCommand = this.editFunerariaCommand
        return async function (req, res) {
            let funerariaid = req.params.funerariaid
            let { name, email, address, postalcode, city, mobilephone, phone, userid } = req.body
            const funeraria = await editFunerariaCommand.execute({ funerariaid, name, email, address, postalcode, city, mobilephone, phone, user: req.user, userid })

            if (!funeraria.success) {
                return res.status(400).json({ error: funeraria.error })
            }
            return res.status(200).json(funeraria)
        }
    }
}

module.exports = EditFunerariaController