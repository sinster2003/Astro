const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function getConnection(){
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
    database = client.db("astro");
}

function getDb()
{
    if(!database)
    {
        throw{message:"Database Not Found"}
    }
    return database;
}

module.exports = {
    getConnection : getConnection,
    getDb : getDb
}