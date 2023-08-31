const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbPort = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_DATABASE || 'files_manager';

    this.uri = `mongodb://${dbHost}:${dbPort}`;
    this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(process.env.DB_DATABASE || 'files_manager');
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }

  async isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    try {
      const usersCollection = this.db.collection('users');
      const count = await usersCollection.countDocuments();
      return count;
    } catch (error) {
      console.error("Error counting users:", error);
      return -1;
    }
  }

  async nbFiles() {
    try {
      const filesCollection = this.db.collection('files');
      const count = await filesCollection.countDocuments();
      return count;
    } catch (error) {
      console.error("Error counting files:", error);
      return -1;
    }
  }

  async close() {
    await this.client.close();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
