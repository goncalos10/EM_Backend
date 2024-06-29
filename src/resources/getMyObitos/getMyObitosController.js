const utils = require("../../common/utils")

class GetMyObitosController {
    constructor(getMyObitosQuery, getMyFunerariasQuery) {
        this.getMyObitosQuery = getMyObitosQuery
        this.getMyFunerariasQuery = getMyFunerariasQuery
    }

    execute() {
        let getMyObitosQuery = this.getMyObitosQuery
        let getMyFunerariasQuery = this.getMyFunerariasQuery

        return async function (req, res) {

            let funerariaid = req.params.funerariaid

            funerariaid = parseInt(funerariaid)

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

            const obito = await getMyObitosQuery.execute(funerariaid)

            if (!obito.success) {
                return res.status(400).json({ error: obito.error })
            }

            return res.status(200).json(obito)
        }
    }
}

module.exports = GetMyObitosController