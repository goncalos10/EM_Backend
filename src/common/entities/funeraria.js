class Funeraria {
    constructor({ id, name, email, address, postalcode, city, mobilephone, phone, userid }) {
        this.id = id
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
}