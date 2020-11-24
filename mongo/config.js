
const remote_mongo = {
    username: "",
    password: "",
    dbname: "",
    hostname: "",
    port: "27017",
    tablename: "userView"
  };
  
  const local_mongo = {
    username: "",
    password: "",
    dbname: "newTest",
    hostname: "127.0.0.1",
    port: "27017",
    tablename: 'userView'
  }

  
  exports.config = local_mongo;
  
  