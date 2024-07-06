const utils = require("../../common/utils")

class CreateObitoController {
    constructor(createObitoCommand) {
        this.createObitoCommand = createObitoCommand
        
    }

    execute() {
        let createObitoCommand = this.createObitoCommand
        

        return async function (req, res) {
            let { name, freguesia, diafuneral, horafuneral, diamissa, horamissa, igrejaid, capelaid, funerariaid } = req.body
            let url = utils.generateURL(name)


            if (!req.user.funerarias.includes(funerariaid)) {
                return res.status(403).json({ error: 'Its not your funeraria.' })
            }

            const obito = await createObitoCommand.execute({ name, freguesia, diafuneral, horafuneral, diamissa, horamissa, igrejaid, capelaid, url, funerariaid })

            if (!obito.success) {
                return res.status(400).json({ error: obito.error })
            }

            return res.status(201).json(obito)
        }
    }
}

module.exports = CreateObitoController