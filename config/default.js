module.exports = {
  dbConfig: {
    port: 7000,
    uri: 'mongodb://localhost:27017/knowledge'
  },
  corsOptions: {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  },
  secret: 'totoetlesasticotslol',
  logConfig: {}
}
