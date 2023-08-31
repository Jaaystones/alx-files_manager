const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbPort = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_DATABASE || 'files_manager';

    this.uri = `mongodb://${dbHost}:${dbPort}/${dbName}`;
    this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  async isAlive() {
    try {
      await this.client.connect();
      return true;
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      return false;
    } finally {
      await this.client.close();
    }
  }

  async nbUsers() {
    try {
      await this.client.connect();
      const db = this.client.db();
      const usersCollection = db.collection('users');
      const count = await usersCollection.countDocuments();
      return count;
    } catch (error) {
      console.error("Error counting users:", error);
      return -1;
    } finally {
      await this.client.close();
    }
  }

  async nbFiles() {
    try {
      await this.client.connect();
      const db = this.client.db();
      const filesCollection = db.collection('files');
      const count = await filesCollection.countDocuments();
      return count;
    } catch (error) {
      console.error("Error counting files:", error);
      return -1;
    } finally {
      await this.client.close();
    }
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
