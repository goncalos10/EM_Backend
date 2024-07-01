const Obito = require('../../common/entities/obito')

class EditObitoCommand {
    constructor(obitoRepository, funerariaRepository) {
        this.obitoRepository = obitoRepository
        this.funerariaRepository = funerariaRepository
    }

    async execute({ name, freguesia, diafuneral, horafuneral, diamissa, horamissa, igrejaid, capelaid, photo, funerariaid, obitoid }) {
        try {

            const obito = new Obito({ name, freguesia, diafuneral, horafuneral, diamissa, horamissa, igrejaid, capelaid, photo, funerariaid, obitoid })
            const updateObito = await this.obitoRepository.edit(obito)

            return { success: true, data: updateObito }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = EditObitoCommand