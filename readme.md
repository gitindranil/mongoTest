Start server
    npm i
    nodemon index.js 

POSTMAN or browser get call url:
    localhost:4010/testQuery?date=2020-12-05 14:17:32.534Z,2020-12-10 14:17:32.534Z&product=prod1&details=true
    change port in index.js if required

Mongo congifuration
    path -> mongo/config.js
    add remote_mongo details and change export to remote_mongo

Query Detail
    date -> 'daily', 'weekly', 'monthly' or `, seperated two date string`
    product -> ProductId to search for,
    details -> true or false (true returns every unique user's visit count for particular product, false returns unique users count)

example api calls:
    localhost:4010/testQuery?date=2020-12-05 14:17:32.534Z,2020-12-10 14:17:32.534Z&product=prod1&details=true
    localhost:4010/testQuery?date=daily&product=prod1&details=true
    localhost:4010/testQuery?date=monthly&product=prod1&details=true
    localhost:4010/testQuery?date=weekly&product=prod1&details=true
