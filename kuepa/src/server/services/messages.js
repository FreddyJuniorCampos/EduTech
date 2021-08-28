const MongoLib = require("../lib/mongo");

class MessageService {
  constructor() {
    this.collection = "messages";
    this.mongoDB = new MongoLib();
  }

  async getMessages() {
    const messages = await this.mongoDB.getAll(this.collection);
    return messages || [];
  }

  async createMessage({ data }) {
    const createdMessageId = await this.mongoDB.create(this.collection, data);
    return createdMessageId;
  }
}

module.exports = MessageService;
