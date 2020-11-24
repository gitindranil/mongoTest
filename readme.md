Start server: 

    npm i
    nodemon index.js 

POSTMAN or browser get call url:

    localhost:4010/testQuery?date=2020-12-05 14:17:32.534Z,2020-12-10 14:17:32.534Z&product=prod1&details=true
    change port in index.js if required

Mongo configuration: 

    path -> mongo/config.js
    add remote_mongo details and change export to remote_mongo
    change tablename in config file as requirement 

Query Detail: 

    date -> 'daily', 'weekly', 'monthly' or `, seperated two date string`
    product -> ProductId to search for,
    details -> true or false (true returns every unique user's visit count for particular product, false returns unique users count)

    daily gives result of 1 day upto current day 
    weekly gives result of 7 days upto current day 
    monthly gives result of 30 days upto current day 

example api calls and response:

    http://localhost:4010/testQuery?date=2020-01-04%2014:17:32.534Z,2020-12-10%2014:17:32.534Z&product=prod1&details=true

    response:
    
    {
        "totalUsers": 3,
        "uniqueUsers": {
            "users": [
                {
                    "_id": "user2",
                    "count": 1
                },
                {
                    "_id": "user3",
                    "count": 1
                },
                {
                    "_id": "user1",
                    "count": 1
                }
            ],
            "count": 3
        }
    }

    http://localhost:4010/testQuery?date=daily&product=prod1&details=true

    response: 

    {
        "totalUsers": 1,
        "uniqueUsers": {
            "users": [
                {
                    "_id": "user2",
                    "count": 1
                }
            ],
            "count": 1
        }
    }

    http://localhost:4010/testQuery?date=monthly&product=prod1&details=false

    response: 

    {
        "totalUsers": 1,
        "uniqueUsers": 1
    }


    http://localhost:4010/testQuery?date=weekly&product=prod1&details=true

    response:

    {
        "totalUsers": 3,
        "uniqueUsers": {
            "users": [
                {
                    "_id": "user1",
                    "count": 1
                },
                {
                    "_id": "user2",
                    "count": 2
                }
            ],
            "count": 2
        }
    }

    http://localhost:4010/testQuery?date=monthly&product=prod1&details=false

    response:

    {
        "totalUsers": 3,
        "uniqueUsers": 2
    }
