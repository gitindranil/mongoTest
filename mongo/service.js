let mongo = require("mongodb");
let MongoClient = mongo.MongoClient;
let config = require("./config").config;
const mongo_url = `mongodb://${config.hostname}:${config.port}/${config.dbname}`;

function connect() {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(mongo_url, { useUnifiedTopology: true }, function(
        err,
        connection
      ) {
        if (err) {
          reject();
        } else {
          resolve(connection);
        }
      });
    });
  }

run = (query) => {

    console.log(query);
    return new Promise((resolve, reject) => {
        connect().then(async (connection) => {
            try {
                const mongo_db = connection.db(config.dbname);
                const table = mongo_db.collection(config.tablename);
                table.aggregate([
                    {
                        $match: {
                            ViewDate: query.ViewDate,
                            ProductId: query.ProductId
                        }
                    },
                    {
                        $group: {
                            _id: "$UserId",
                            count: {
                                $sum: 1
                            }
                        }, 
                        
                    }
                ]).toArray ((err, result) => {
                    if (err) {
                        connection.close();
                        // res.status(400).send('mongo query error: ' + err);
                        reject(err);
                    } else {
                        resolve({result, count: result.length});
                    }
                })
            } catch(err) {
                console.log('mongo query err', err);
                reject(err);
            }
        }).catch(err => {
            console.log('mongo connection err', err);
            reject(err);
        });
    })
}

module.exports = {
    run: run
}