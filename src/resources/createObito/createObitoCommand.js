const Obito = require('../../common/entities/obito')

class CreateObitoCommand {
    constructor(obitoRepository) {
        this.obitoRepository = obitoRepository
    }

    async execute({ name, freguesia, diafuneral, horafuneral, diamissa, horamissa, photo, url, funerariaid }) {
        try {
            const obito = new Obito({ name, freguesia, diafuneral, horafuneral, diamissa, horamissa, photo, url, funerariaid })
            const createdObito = await this.obitoRepository.create(obito)

            return { success: true, data: createdObito }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = CreateObitoCommand