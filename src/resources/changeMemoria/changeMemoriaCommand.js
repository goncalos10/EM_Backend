const Memoria = require('../../common/entities/memoria')

class ChangeMemoriaCommand {
    constructor(memoriaRepository) {
        this.memoriaRepository = memoriaRepository
    }

    async execute({ userid, obitoid }) {

        userid = parseInt(userid)
        obitoid = parseInt(obitoid)
        try {
            const isAlreadyAdded = (await this.memoriaRepository.listUserMemorias(userid)) || []

            if (isAlreadyAdded.find(memoria => memoria.obitoid === obitoid)) {
                await this.memoriaRepository.removeMemoria({ userid, obitoid })
                return { success: true, data: true }
            } else {
                await this.memoriaRepository.addMemoria({ userid, obitoid })
                return { success: true, data: true }
            }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = ChangeMemoriaCommand