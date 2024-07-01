const utils = require("../../common/utils")

class CreateLocalController {
    constructor(createLocalCommand) {
        this.createLocalCommand = createLocalCommand
    }

    execute() {
        let createLocalCommand = this.createLocalCommand
        return async function (req, res) {
            let { name, address, city, tipo } = req.body
            const local = await createLocalCommand.execute({ name, address, city, tipo })

            if (!local.success) {
                return res.status(400).json({ error: local.error })
            }
            return res.status(201).json(local)
        }
    }
}

module.exports = CreateLocalController