const utils = require("../../common/utils")

class CreateObitoController {
    constructor(createObitoCommand, getMyFunerariasQuery) {
        this.createObitoCommand = createObitoCommand
        this.getMyFunerariasQuery = getMyFunerariasQuery
    }

    execute() {
        let createObitoCommand = this.createObitoCommand
        let getMyFunerariasQuery = this.getMyFunerariasQuery

        return async function (req, res) {
            let { name, freguesia, diafuneral, horafuneral, diamissa, horamissa, igrejaid, capelaid, funerariaid } = req.body
            let url = utils.generateURL(name)

            const funeraria = await getMyFunerariasQuery.execute(req.user)
            if (!funeraria.success) {
                return res.status(500).json({ error: funeraria.error })
            }

            let funerarias = funeraria.data.map((funeraria) => {
                return funeraria.funerariaid
            })

            if (!funerarias.includes(funerariaid)) {
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