const utils = require("../../common/utils")

class EditObitoController {
    constructor(editObitoCommand) {
        this.editObitoCommand = editObitoCommand
    }

    execute() {
        let editObitoCommand = this.editObitoCommand
        return async function (req, res) {
            let obitoid = req.params.obitoid
            let { name, freguesia, diafuneral, horafuneral, diamissa, horamissa, igrejaid, capelaid, funerariaid } = req.body

            const obitoUpdate = await editObitoCommand.execute({ name, freguesia, diafuneral, horafuneral, diamissa, horamissa, igrejaid, capelaid, funerariaid, obitoid })

            if (!obitoUpdate.success) {
                return res.status(400).json({ error: obitoUpdate.error })
            }
            return res.status(200).json(obitoUpdate)
        }
    }
}

module.exports = EditObitoController