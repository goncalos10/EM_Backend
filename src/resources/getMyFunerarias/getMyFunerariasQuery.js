const Funeraria = require('../../common/entities/funeraria')
const utils = require('../../common/utils')

class GetMyFunerariasQuery {
    constructor(funerariaRepository) {
        this.funerariaRepository = funerariaRepository
    }

    async execute(user) {
        try {

            const funerariasUser = (await this.funerariaRepository.findFunerariasByUserID(user.userid)) || []
            return { success: true, data: funerariasUser }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = GetMyFunerariasQuery