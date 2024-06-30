const Funeraria = require('../../common/entities/funeraria')

class EditFunerariaCommand {
    constructor(funerariaRepository) {
        this.funerariaRepository = funerariaRepository
    }

    async execute({ funerariaid, name, email, address, postalcode, city, mobilephone, phone, user, userid }) {
        try {

            const funeraria = user.editFuneraria({ funerariaid, name, email, address, postalcode, city, mobilephone, phone, userid })

            const updatedFuneraria = await this.funerariaRepository.update(funeraria)

            return { success: true, data: updatedFuneraria }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = EditFunerariaCommand