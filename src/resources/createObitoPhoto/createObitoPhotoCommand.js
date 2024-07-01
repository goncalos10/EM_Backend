const Obito = require('../../common/entities/obito')

class CreateObitoPhotoCommand {
    constructor(obitoRepository) {
        this.obitoRepository = obitoRepository
    }

    async execute(obitoid, ext) {
        try {
            obitoid = parseInt(obitoid)
            let obito = await this.obitoRepository.findByID(obitoid)

            if (!obito) {
                return { success: false, error: 'Obito não existe' }
            }

            console.log(obito)

            obito.photo = '/uploads/' + obito.url + '.' + ext

            await this.obitoRepository.changePhoto(obito)

            return { success: true, data: obito.url + '.' + ext }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = CreateObitoPhotoCommand