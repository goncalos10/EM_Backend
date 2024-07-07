const Memoria = require('../../common/entities/memoria')
const utils = require('../../common/utils')

class GetMyMemoriasQuery {
    constructor(memoriaRepository) {
        this.memoriaRepository = memoriaRepository
    }

    async execute() {

        return async function (req, res) {
            let userid = req.user.id
            console.log(userid)
            try {
                const memorias = (await this.memoriaRepository.listUserMemorias(userid)) || []
                return { success: true, data: memorias }

            } catch (error) {
                return { success: false, error: error.message }
            }
        }
    }
}

module.exports = GetMyMemoriasQuery