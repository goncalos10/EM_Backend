const Funeraria = require('../../common/entities/funeraria')

class CreateFunerariaCommand {
    constructor(funerariaRepository) {
        this.funerariaRepository = funerariaRepository
    }

    async execute({ name, email, address, postalcode, city, mobilephone, phone, user, userid }) {
        try {
            const funeraria = user.createFuneraria({ name, email, address, postalcode, city, mobilephone, phone, userid })

            const createdFuneraria = await this.funerariaRepository.create(funeraria)

            return { success: true, data: createdFuneraria }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = CreateFunerariaCommand