// Do not change this file
const { MongoClient } = require('mongodb');
process.env.SESSION_SECRET = 'yashwant';
process.env.PORT = 5000
process.env.MONGO_URI = 'mongodb://Yashwant:Yashwant@cluster0-shard-00-00.xubvb.mongodb.net:27017,cluster0-shard-00-01.xubvb.mongodb.net:27017,cluster0-shard-00-02.xubvb.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-o4dwpd-shard-0&authSource=admin&retryWrites=true&w=majority';
process.env.GITHUB_CLIENT_SECRET = 'c7cc7ad4ba27595c3f5eb25da7f722e009e9e9ad';
process.env.GITHUB_CLIENT_ID = 'dfda87b925efec587e40';
async function main(callback) {
    const URI = process.env.MONGO_URI; // Declare MONGO_URI in your .env file
    const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await callback(client);

    } catch (e) {
        // Catch any errors
        console.error(e);
        throw new Error('Unable to Connect to Database')
    }
}

module.exports = main;