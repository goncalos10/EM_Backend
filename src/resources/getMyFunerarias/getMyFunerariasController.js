const utils = require("../../common/utils")

class GetMyFunerariasController {
    constructor(getMyFunerariasQuery) {
        this.getMyFunerariasQuery = getMyFunerariasQuery
    }

    execute() {
        let getMyFunerariasQuery = this.getMyFunerariasQuery
        return async function (req, res) {
            const funeraria = await getMyFunerariasQuery.execute(req.user)

            if (!funeraria.success) {
                return res.status(400).json({ error: funeraria.error })
            }

            return res.status(200).json(funeraria)
        }
    }
}

module.exports = GetMyFunerariasController