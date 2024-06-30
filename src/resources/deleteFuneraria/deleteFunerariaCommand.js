const Funeraria = require('../../common/entities/funeraria')

class DeleteFunerariaCommand {
    constructor(funerariaRepository) {
        this.funerariaRepository = funerariaRepository
    }

    async execute({ funerariaid, user, userid }) {
        try {

            const funeraria = user.deleteFuneraria({ funerariaid, user, userid })

            await this.funerariaRepository.delete(parseInt(funerariaid))

            return { success: true }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = DeleteFunerariaCommand
