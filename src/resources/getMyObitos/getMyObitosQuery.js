const Funeraria = require('../../common/entities/funeraria')
const utils = require('../../common/utils')

class GetMyObitosQuery {
    constructor(funerariaRepository) {
        this.funerariaRepository = funerariaRepository
    }

    async execute(funerariaid) {
        try {
            const obitos = (await this.funerariaRepository.findObitosByFunerariaID(funerariaid)) || []
            return { success: true, data: obitos }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = GetMyObitosQuery