module.exports =  {
    mongoDB: {
      dbProtocol: process.env.DB_PROTOCOL,
      dbHost: process.env.DB_HOST,
      dbPORT: process.env.DB_PORT,
      dbName: process.env.DB_NAME,

      reconnectTime: 1000,

      options: {
        useMongoClient: true,
      }
    }
};
