const e = require("express");
let express = require("express");
let router = express.Router();
let mongoService = require('./mongo/service');

router.get(
    "/testQuery",
    (req, res) => {
        if (req.query.date && req.query.product) {
            const dateQuery = req.query.date.split(',');
            console.log(dateQuery);
            let endDate = new Date();
            let startDate = new Date();
            let range = {
                "daily": 1,
                "weekly": 7,
                "monthly": 30
            }
            let query = {
                ProductId: req.query.product,
                details: req.query.details || false
            }
            if (dateQuery.length === 2) {
                query.ViewDate = {
                    $gte: new Date(dateQuery[0]),
                    $lt: new Date(dateQuery[1])
                }
            } else if (dateQuery.length === 1) {
                if (range.hasOwnProperty(dateQuery)) {
                    console.log(startDate, endDate);
                    startDate.setDate(endDate.getDate() - range[dateQuery]);
                    console.log(startDate, endDate);
                    query.ViewDate = {
                        $gte: startDate,
                        $lt: endDate
                    }
                } else {
                    res.status(400).send('Invalid Query');
                }
            } else {
                res.status(400).send('Invalid Query');
            }

            if (query.ViewDate) {
                mongoService.run(query).then((data) => {
                    console.log('data', data);
                    let totalCount = 0

                    if (data.result.length) {
                        totalCount = data.result.map((e) => e.count).reduce((a,b) => a+b);
                    }
                    const uniqueCount = data.count;
                    const uniqueUsers = data.result;
                    let response = {
                        totalUsers: totalCount,
                        uniqueUsers: uniqueCount
                    }
                    if (req.query.details==="true") {
                        response.uniqueUsers = {
                            users: data.result,
                            count: data.count
                        };
                    }
                    console.log('res', response);
                    res.send(response);
                }).catch((err) => {
                    console.log('err', err);
                    res.status(400).send(err);
                });
            }
        } else {
            res.status(400).send('Invalid Query');
        }
    }
);

module.exports = router;