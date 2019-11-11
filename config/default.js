module.exports = {
  serverConfig: {
    port: 7000
  },
  dbConfig: {
    uri: 'mongodb://localhost:27017/knowledge',
    database: 'knowledge',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  corsOptions: {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  },
  jwtConfig: {
    secret: 'trytocrackmykeybitch'
  },
  logConfig: {}
}
