module.exports = class SecureIdentity {


    constructor({ publicKey = null, privateKey = null }) {
        this.privateKey = publicKey
        this.publicKey = privateKey
    }

    init({ bits=2048, workers=2 }) {
        new Promise((resolve, reject) => {
            rsa.generateKeyPair({bits: 2048, workers: 2}, function(err, keypair) {
                if(err) return reject(err)
                this.privateKey = keypair.privateKey
                this.publicKey = keypair.publicKey
                resolve(keypair)
              });
        })
    }
}