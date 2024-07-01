const utils = require("../../common/utils")

class EditLocalController {
    constructor(editLocalCommand) {
        this.editLocalCommand = editLocalCommand
    }

    execute() {
        let editLocalCommand = this.editLocalCommand
        return async function (req, res) {
            let localid = req.params.localid
            let { name, address, city, tipo } = req.body
            const localUpdate = await editLocalCommand.execute({ localid, name, address, city, tipo })

            if (!localUpdate.success) {
                return res.status(400).json({ error: localUpdate.error })
            }
            return res.status(200).json(localUpdate)
        }
    }
}

module.exports = EditLocalController