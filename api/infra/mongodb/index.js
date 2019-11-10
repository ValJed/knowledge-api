const { MongoClient } = require('mongodb')

let client
let db

const connect = async ({
  uri,
  database,
  options
}) => {
  if (!client) {
    client = new MongoClient(uri, options)

    await client.connect()

    db = client.db(database)
  }
}

const disconnect = async () => {
  await client.close()
}

module.exports = {
  client: () => client,
  db: () => db,
  connect,
  disconnect
}
