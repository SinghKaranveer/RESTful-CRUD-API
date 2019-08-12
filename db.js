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
        MongoClient.connect(url, mongoOptionsm, (err, client) =>{
            if(err)
                cb(err);
            else
            {
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}