const express = require("express");
var cors = require("cors");
let bodyParser = require("body-parser");
let router = require("./routes");
const app = express();


app.use(cors());

app.use(
  bodyParser.json({
    limit: "100mb"
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    parameterLimit: 10000000,
    extended: false
  })
);

app.use("/", router);

const PORT = 4010;

let server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.timeout = 100000;


