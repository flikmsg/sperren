const forge = require('node-forge')

const crypto = require("crypto")

const to64 = msg => new Buffer(msg).toString('base64'),
      from64 = msg => new Buffer(msg, 'base64').toString('utf-8')

module.exports = class SecureConversation {
    constructor({ token= crypto.randomBytes(64).toString('hex'), salt= crypto.randomBytes(64).toString('hex'), method="AES-CBC", id=crypto.randomBytes(5).toString('hex'), members=[], self=null }) {
        this.token = token
        this.salt = salt
        this.key = forge.pkcs5.pbkdf2(this.token, this.salt, 5, 16)
        this.members = members
        this.self = self
        this.id = id
        this.method = method
    }

    preparePayload(payload) {
        payload = JSON.stringify(payload)
        const cipher = forge.cipher.createCipher(this.method, this.key)
        const iv = forge.random.getBytesSync(8)
        cipher.start({ iv })
        cipher.update(forge.util.createBuffer(payload))
        cipher.finish()
        return JSON.stringify({id: this.id, message: to64(cipher.output.getBytes()), iv: to64(iv) })
    }

    recievePayload(payload) {
        payload = JSON.parse(payload)
        var decipher = forge.cipher.createDecipher(this.method, this.key);
        decipher.start({iv: from64(payload.iv)});
        decipher.update(forge.util.createBuffer(from64(payload.message)));
        decipher.finish();
        return JSON.parse(decipher.output.data)
    }
}
