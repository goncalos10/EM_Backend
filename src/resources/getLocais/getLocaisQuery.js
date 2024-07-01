const Funeraria = require('../../common/entities/funeraria')
const utils = require('../../common/utils')

class GetLocaisQuery {
    constructor(locaisRepository) {
        this.locaisRepository = locaisRepository
    }

    async execute(tipo) {
        try {
            const locais = (await this.locaisRepository.findByTipo(tipo)) || []
            return { success: true, data: locais }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = GetLocaisQuery