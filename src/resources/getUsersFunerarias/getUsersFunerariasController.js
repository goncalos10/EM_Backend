const utils = require("../../common/utils")

class GetUsersFunerariasController {
    constructor(getUsersFunerariasQuery) {
        this.getUsersFunerariasQuery = getUsersFunerariasQuery
    }

    execute() {
        let getUsersFunerariasQuery = this.getUsersFunerariasQuery
        return async function (req, res) {
            const users = await getUsersFunerariasQuery.execute()

            if (!users.success) {
                return res.status(400).json({ error: users.error })
            }

            return res.status(200).json(users)
        }
    }
}

module.exports = GetUsersFunerariasController