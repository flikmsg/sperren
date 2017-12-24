// const forge = require('node-forge')
// const rsa = forge.rsa

 
// // generate an RSA key pair asynchronously (uses web workers if available) 
// // use workers: -1 to run a fast core estimator to optimize # of workers 
// // *RECOMMENDED* - can be significantly faster than sync -- and will use 
// // native APIs if available. 
// rsa.generateKeyPair({bits: 2048, workers: 2}, function(err, keypair) {
//     console.log(keypair)
//   });


const SecureConversation = require('./SecureConversation')
const Identity = require('./Identity')

// const user1 = new SecureIdentity({ keypair: await getSelf() })
// const user2 = new SecureIdentity({ keypair: await getUser('user1') })

// const convo = new SecureConversation({ members: [user1, user2], self: user1 })

// const message = await convo.preparePayload({
//     message: "Hi!"
// })

module.exports = { SecureConversation, Identity }

// const convo = new SecureConversation( {} );

// const msg = convo.preparePayload({
//     message: "Hi, how are you doing today!"
// })

// console.log(msg)

// console.log(convo.recievePayload(msg))