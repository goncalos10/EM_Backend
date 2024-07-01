class Funeraria {
    constructor({ funerariaid, name, email, address, postalcode, city, mobilephone, phone, userid }) {
        this.funerariaid = funerariaid
        this.name = name
        this.email = email
        this.address = address
        this.postalcode = postalcode
        this.city = city
        this.mobilephone = mobilephone
        this.phone = phone
        this.userid = userid
    }

    createObito(obito) {
        return {
            name: obito.name,
            freguesia: obito.freguesia,
            diafuneral: obito.diafuneral,
            horafuneral: obito.horafuneral,
            diamissa: obito.diamissa,
            horamissa: obito.horamissa,
            photo: obito.photo,
            funerariaid: this.id,
        }
    }

    editObito(obito) {
        return {
            obitoid: obito.obitoid,
            name: obito.name,
            freguesia: obito.freguesia,
            diafuneral: obito.diafuneral,
            horafuneral: obito.horafuneral,
            diamissa: obito.diamissa,
            horamissa: obito.horamissa,
            photo: obito.photo,
            funerariaid: this.id,
        }
    }

    deleteObito(obitoid) {
        if (this.roleid !== 2) {
            throw new Error('Only funerarias can delete obitos')
        }
        return {
            obitoid
        }

    }


}

module.exports = Funeraria