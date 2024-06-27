const Funeraria = require('../../common/entities/funeraria')

class CreateFunerariaCommand {
    constructor(funerariaRepository) {
        this.funerariaRepository = funerariaRepository
    }

    async execute({ name, email, address, postalcode, city, mobilephone, phone, userid }) {
        try {
            const funeraria = new Funeraria({ name, email, address, postalcode, city, mobilephone, phone, userid })
            const validate = Funeraria.validateFuneraria(funeraria)

            if (!validate) {
                throw new Error('Funeraria invalid')
            }

            const createdFuneraria = await this.funerariaRepository.create(funeraria)

            return { success: true, data: createdFuneraria }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = CreateFunerariaCommand