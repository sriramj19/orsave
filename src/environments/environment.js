ObjectId = require('mongodb').ObjectID;
module.exports = {
    PORT: 7337,
    prodMongoDBUrl: 'mongodb://ds151814.mlab.com:51814/orsave',
    devMongoDBUrl: 'mongodb://localhost:27017/orsave',
    saltRounds: 10,
    user: 'sriram.j',
    pass: 'Z2Z0QDEyMw==',
    defaultUserId: ObjectId('5c467b230b75aa195697cbbf')
}
