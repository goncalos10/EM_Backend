class Obito {
    constructor({ id, name, freguesia, diafuneral, horafuneral, diamissa, horamissa, photo, funerariaid }) {
        this.id = id
        this.name = name
        this.freguesia = freguesia
        this.diafuneral = diafuneral
        this.horafuneral = horafuneral
        this.diamissa = diamissa
        this.horamissa = horamissa
        this.photo = photo
        this.funerariaid = funerariaid
    }

    static validateObito(obito) {
        if (!obito.name) {
            throw new Error('Name is required')
        }
        if (!obito.freguesia) {
            throw new Error('Freguesia is required')
        }
        if (!obito.diafuneral) {
            throw new Error('Diafuneral is required')
        }
        if (!obito.horafuneral) {
            throw new Error('Hora funeral is required')
        }
        if (!obito.diamissa) {
            throw new Error('Dia da missa is required')
        }
        if (!obito.horamissa) {
            throw new Error('Hora da missa is required')
        }
    }
}