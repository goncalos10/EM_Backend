const utils = require("../../common/utils")

class CreateFunerariaController {
    constructor(createFunerariaCommand) {
        this.createFunerariaCommand = createFunerariaCommand
    }

    execute() {
        let createFunerariaCommand = this.createFunerariaCommand
        return async function (req, res) {
            let { name, email, address, postalcode, city, mobilephone, phone, userid } = req.body
            const funeraria = await createFunerariaCommand.execute({ name, email, address, postalcode, city, mobilephone, phone, userid })

            if (!funeraria.success) {
                return res.status(400).json({ error: funeraria.error })
            }
            return res.status(201).json(funeraria)
        }
    }
}