const MongoLib = require("../lib/mongo");

class RegisterService {
  constructor() {
    this.collection = "user";
    this.mongoDB = new MongoLib();
  }

  async createUser({ data }) {
    const userExist = await this.mongoDB.get(this.collection, data.username);
    if (!userExist) {
      const createdUserId = await this.mongoDB.create(this.collection, data);
      return createdUserId;
    }
    throw new Error("Username is already in use");
  }

  async deleteUser({ userId }) {
    const deletedUserId = await this.mongoDB.delete(this.collection, userId);
    return deletedUserId;
  }
}

module.exports = RegisterService;
