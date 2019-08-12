const MongoClient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectID;
const dbname = "crud_mongodb";
const url = "mongodb://localhost:27017";
const mongoOptions = {useNewUrlParser : true};

const state = {
    db : null
};

const connect = (cb) =>{
    if(state.db)
        cb();
    else
    {
        MongoClient.connect(url, mongoOptions, (err, database) =>{
            if(err)
                cb(err);
            else
            {
                state.db = database.db(dbname);
                state.db.createCollection("customers", (err, res) =>{
                    if(err) throw err;
                    console.log("Collection is created");
                    database.close();
                });
                cb();
            }
        });
    }
}

const getDB = () =>{
    return state.db;
}

function insert(collection)
{

}

module.exports = {getDB, connect};